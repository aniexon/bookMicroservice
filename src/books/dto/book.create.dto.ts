
import { Type } from "class-transformer";
import { IsInt,IsISBN, IsString, Length,Min} from "class-validator";


export class BookCreateDTO {

    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsInt()
    @Type (() => Number)
    year: number;


    @IsString()
    @Length(13, 13, { message: 'El ISBN debe tener exactamente 13 caracteres' })
    isbn: string;
    

    @IsInt()
    @Min(1, { message: 'El stock debe ser mayor a 0' })
    @Type (() => Number)
    stock: number;
   
}