
import { Controller, ParseIntPipe} from "@nestjs/common";
import { BooksService } from "./books.service";
import { BookCreateDTO } from "./dto/book.create.dto";
import { BookUpdateDTO } from "./dto/book.update.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('books')
export class BooksController {

    constructor(private readonly service: BooksService) { }

    @MessagePattern({cmd: 'books.findAll'})
    findAll() {
        return this.service.findAll();
    }

    @MessagePattern({cmd: 'books.findOne'})
    findOne(@Payload('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @MessagePattern({cmd: 'books.create'})
    create(@Payload() data: BookCreateDTO) {
        return this.service.create(data);
    }

    @MessagePattern({cmd: 'books.update'})
    update(@Payload() data: BookUpdateDTO) {
        return this.service.update(+data.id, data);
    }

    @MessagePattern({cmd: 'books.delete'})
    delete(@Payload('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }


}
