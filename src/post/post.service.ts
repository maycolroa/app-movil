import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { usuario_id, titulo, contenido, estatus } = createPostDto;
    // Verificar que el usuario existe
    const usuario = await this.userRepository.findOneBy({ id: usuario_id });
    if (!usuario) {
      throw new NotFoundException(`User with ID ${usuario_id} not found`);
    }
    // Crear el post con las relaciones
    const post = this.postRepository.create({
      titulo,
      contenido,
      estatus,
      usuario,
    });

    return this.postRepository.save(post);
  }

  // Nueva función para obtener todos los posts
  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['usuario'], // Incluir la relación con el usuario
    });
  }
}
