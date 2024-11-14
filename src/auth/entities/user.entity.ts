import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', { select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  // Relación OneToMany con Post
  @OneToMany(() => Post, (post) => post.usuario)
  posts: Post[]; // Esto crea la relación inversa de un usuario a sus posts
}
