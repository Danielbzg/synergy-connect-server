import { PartialType } from '@nestjs/mapped-types';
import { CreateCrudNoteDto } from './create-crud-note.dto';

export class UpdateCrudNoteDto extends PartialType(CreateCrudNoteDto) {}
