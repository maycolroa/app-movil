import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class Etiqueta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  nombre_etiqueta: string;

  @ManyToMany(() => Post, (post) => post.etiquetas)
  posts: Post[];
}
