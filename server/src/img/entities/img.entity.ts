import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Img {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    img: string;

    @Column({ nullable: true })
    desciption: string;

    @ManyToOne(() => User, (user: User) => user.img)
    @JoinColumn({ name: 'user_id' })
    user: User

    @CreateDateColumn()
    createdAt: Date;
}
