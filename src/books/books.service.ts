import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { BookCreateDTO } from './dto/book.create.dto';
import { BookUpdateDTO } from './dto/book.update.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class BooksService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
        console.log('Database connected');
    }

    async findAll() {
        return await this.book.findMany();
    }

    async findOne(id: number) {
        const book = await this.book.findUnique({
            where: { id: id }
        });

        if (!book) {
            throw new RpcException(
                { status: 400, message :`Book con ${id} no encontrado`}
        
            );
        }

        return book;
    }

    async create(bookCreateDTO: BookCreateDTO) {
        return await this.book.create({
            data: bookCreateDTO
        });
    }

    async update(id: number, bookUpdateDTO: BookUpdateDTO) {
        await this.findOne(id);

        return await this.book.update({
            where: { id: id },
            data: bookUpdateDTO
        })
    }

    async delete(id: number) {
        await this.findOne(id);

        return await this.book.delete({
            where: { id: id }
        })
    }

}

