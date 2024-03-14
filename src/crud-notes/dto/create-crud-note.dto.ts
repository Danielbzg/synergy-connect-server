import { IsString, MinLength } from "class-validator";

export class CreateCrudNoteDto {

    @IsString()
    @MinLength(1)
    id: string

    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    @MinLength(3)
    description: string;
}
