import { Module } from '@nestjs/common';
import { EtiquetaService } from './etiqueta.service';
import { EtiquetaController } from './etiqueta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etiqueta } from './entities/etiqueta.entity';
import { Post } from 'src/post/entities/post.entity'; // Importar la entidad Post

@Module({
  imports: [TypeOrmModule.forFeature([Etiqueta, Post])], // Añadir las entidades necesarias
  controllers: [EtiquetaController],
  providers: [EtiquetaService],
})
export class EtiquetaModule {}
