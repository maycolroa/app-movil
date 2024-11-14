import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from './entities/comentario.entity';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const { usuario_id, post_id, cuerpo_comentario } = createComentarioDto;

    // Buscar el usuario por UUID
    const usuario = await this.userRepository.findOneBy({ id: usuario_id });
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${usuario_id} not found`);
    }

    // Buscar el post por UUID
    const post = await this.postRepository.findOneBy({ id: post_id });
    if (!post) {
      throw new NotFoundException(`Post with ID ${post_id} not found`);
    }

    // Crear el comentario con las relaciones
    const comentario = this.comentarioRepository.create({
      cuerpo_comentario,
      usuario,
      post,
    });

    return this.comentarioRepository.save(comentario);
  }

  async findAll(): Promise<Comentario[]> {
    return this.comentarioRepository.find({ relations: ['usuario', 'post'] });
  }

  async findOne(id: string): Promise<Comentario> {
    const comentario = await this.comentarioRepository.findOne({
      where: { id },
      relations: ['usuario', 'post'],
    });
    if (!comentario)
      throw new NotFoundException(`Comentario with ID ${id} not found`);
    return comentario;
  }

  async update(
    id: string,
    updateComentarioDto: UpdateComentarioDto,
  ): Promise<Comentario> {
    const comentario = await this.findOne(id);
    Object.assign(comentario, updateComentarioDto);
    return this.comentarioRepository.save(comentario);
  }

  async remove(id: string): Promise<void> {
    const comentario = await this.findOne(id);
    await this.comentarioRepository.remove(comentario);
  }
}
