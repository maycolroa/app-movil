import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './entities/comentario.entity';
import { Post } from 'src/post/entities/post.entity'; // Importar la entidad Post
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario, Post, User])],
  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule {}
