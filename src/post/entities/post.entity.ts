import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Comentario } from 'src/comentario/entities/comentario.entity';
import { Etiqueta } from 'src/etiqueta/entities/etiqueta.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 130 })
  titulo: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion: Date;

  @Column('text')
  contenido: string;

  @Column({ length: 22 })
  estatus: string;

  // Relación ManyToOne con User
  @ManyToOne(() => User, (usuario) => usuario.posts)
  usuario: User;

  // Relación ManyToOne con Categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.posts)
  categoria: Categoria;

  // Relación OneToMany con Comentarios
  @OneToMany(() => Comentario, (comentario) => comentario.post)
  comentarios: Comentario[];

  // Relación ManyToMany con Etiquetas
  @ManyToMany(() => Etiqueta)
  @JoinTable({
    name: 'posts_etiquetas', // Nombre de la tabla de unión
  })
  etiquetas: Etiqueta[];
}
