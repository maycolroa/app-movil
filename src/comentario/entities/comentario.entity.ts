import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  cuerpo_comentario: string;

  @ManyToOne(() => User, (usuario) => usuario.id)
  usuario: User;

  @ManyToOne(() => Post, (post) => post.comentarios)
  post: Post;
}
