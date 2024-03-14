import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrudNotesService } from './crud-notes.service';
import { CreateCrudNoteDto } from './dto/create-crud-note.dto';
import { UpdateCrudNoteDto } from './dto/update-crud-note.dto';

@Controller('crud-notes')
export class CrudNotesController {
  constructor(private readonly crudNotesService: CrudNotesService) {}

  @Post()
  create(@Body() id: string, createCrudNoteDto: CreateCrudNoteDto) {
    return this.crudNotesService.create(id, createCrudNoteDto);
  }

  @Get()
  findAll() {
    return this.crudNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudNotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudNoteDto: UpdateCrudNoteDto) {
    return this.crudNotesService.update(updateCrudNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudNotesService.remove(id);
  }
}
