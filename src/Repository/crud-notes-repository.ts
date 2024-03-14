import { CreateCrudNoteDto } from "src/crud-notes/dto/create-crud-note.dto";
import { UpdateCrudNoteDto } from "src/crud-notes/dto/update-crud-note.dto";
import { CrudNote } from "src/crud-notes/entities/crud-note.entity";

export interface CrudNoteRepository{
    create(createCrudNoteDto: CreateCrudNoteDto): Promise<CrudNote>;
    findAll(): Promise<CrudNote[]>;
    findOne(id: string): Promise<CrudNote>;
    update(id: string, updateCrudNoteDto: UpdateCrudNoteDto): Promise<CrudNote>;
    remove(id: string): Promise<void>;
  }
  