import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    client: User;

    @ManyToOne(() => User)
    provider: User;

    @ManyToOne(() => Service)
    service: Service;

    @Column()
    amount: number;

    @Column()
    createdAt: Date;
}
