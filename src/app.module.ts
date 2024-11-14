import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { ComentarioModule } from './comentario/comentario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EtiquetaModule } from './etiqueta/etiqueta.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    PostModule,
    ComentarioModule,
    CategoriaModule,
    EtiquetaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
