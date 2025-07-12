
import { PartialType } from "@nestjs/mapped-types";
import { BookCreateDTO } from "./book.create.dto";
import { IsNumber } from "class-validator";

export class BookUpdateDTO extends PartialType(BookCreateDTO) {
   @IsNumber()
    id: number;
}