import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // funcion para crear usuario ne la base de datos
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...Userdata } = createUserDto;
      const user = this.userRepository.create({
        ...Userdata,
        password: await bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      delete user.isActive;
      return user;
    } catch (error) {
      // manejo de errores de base de datos
      this.handleDBError(error);
    }
  }

  async login(loginUser: LoginUserDto) {
    const { email, password } = loginUser;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { password: true, email: true },
    });
    //verificacion si no encuentra el usuario
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado (user)');
    }
    //verificacion si la contraseña no existe
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('contraseña no encontrado (password)');
    return user;
  }
  // llamar usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  // elimiar usuario
  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException(`usuario con id ${id} no encontrado`);
    }
  }
  // Actualizar un usuario
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user)
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  // manejo de errores de base de datos
  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.log(error);
    throw new InternalServerErrorException('Error de base de datos');
  }
}
