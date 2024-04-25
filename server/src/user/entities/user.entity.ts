import { Img } from 'src/img/entities/img.entity';
import { 
    Column,
    Entity, 
    CreateDateColumn,
    UpdateDateColumn, 
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Img, (img: Img) => img.user, { onDelete: 'CASCADE'})
    img: Img[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
