import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { ServicesService } from '../services/services.service';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
            private usersService: UsersService,
                private servicesService: ServicesService,
    ) {}

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const { clientId, providerId, serviceId, amount } = createTransactionDto;
        const client = await this.usersService.findById(clientId);
        const provider = await this.usersService.findById(providerId);
        const service = await this.servicesService.findById(serviceId);

        if (client.balance < amount) {
            throw new Error('Saldo insuficiente');
        }

        client.balance -= amount;
        provider.balance += amount;

        await this.usersService.update(client);
        await this.usersService.update(provider);

        const transaction = this.transactionsRepository.create({
            ...createTransactionDto,
            createdAt: new Date(),
        });
        return this.transactionsRepository.save(transaction);
    }
}
