import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsString()
  titulo: string;

  @IsString()
  contenido: string;

  @IsString()
  estatus: string;

  @IsUUID()
  usuario_id: string;
}
