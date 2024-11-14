import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  nombre_categoria: string;

  @OneToMany(() => Post, (post) => post.categoria)
  posts: Post[];
}
