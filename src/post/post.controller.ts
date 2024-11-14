import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  // Nuevo endpoint para obtener todos los posts
  @Get()
  findAll() {
    return this.postService.findAll();
  }
}
