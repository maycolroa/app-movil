import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo de TypeOrm
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity'; // Importa la entidad Post
import { User } from '../auth/entities/user.entity'; // Importa la entidad User

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
