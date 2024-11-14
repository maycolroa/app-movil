import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //funcion para crear el usuario
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  //funcion para logiarse
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  // usuario para llamar todos los usuarios
  @Get('users')
  finAll() {
    return this.authService.findAll();
  }
  // funcion para eliminar usuario
  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
  // actualizar usuario
  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }
}
