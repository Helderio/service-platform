import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['nif', 'email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    nif: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: 'client' | 'provider';
}
