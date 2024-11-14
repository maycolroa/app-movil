// comentario/dto/create-comentario.dto.ts
import { IsString, IsUUID } from 'class-validator';

export class CreateComentarioDto {
  @IsString()
  cuerpo_comentario: string;

  @IsUUID()
  usuario_id: string;

  @IsUUID()
  post_id: string;
}
