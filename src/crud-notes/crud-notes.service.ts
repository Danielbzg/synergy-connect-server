import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CrudNote } from './entities/crud-note.entity';
import { CreateCrudNoteDto } from './dto/create-crud-note.dto';
import { UpdateCrudNoteDto } from './dto/update-crud-note.dto';

@Injectable()
export class CrudNotesService {

  constructor(
    @InjectModel( CrudNote.name )
    private readonly notesModel: Model<CrudNote>
  ) {}

  async create(id: string, createCrudNoteDto: CreateCrudNoteDto) {
    try {
      createCrudNoteDto.id = id;
      const note = await this.notesModel.create( createCrudNoteDto );

      return note;
    } catch(error) {
      console.log(error);
    }
  }

  async findAll(): Promise<CreateCrudNoteDto[]> {
    const notes = await this.notesModel.find().exec();
    return notes.map(note => ({
      id: note.id,
      title: note.title,
      description: note.description,
    }));
  }

  async findOne(id: string) {
    let note: CrudNote;
    
    console.log("intentando buscar " + id)
    note = await this.notesModel.findOne({ id: id }).exec();
    console.log("encontrada " + id)

    if(!note) {
      throw new NotFoundException(`Note with this id "${ id }" not found`);
    }

    return note;
  }

  async update(updateCrudNoteDto: UpdateCrudNoteDto) {

    let note = await this.findOne( updateCrudNoteDto.id );
    if( updateCrudNoteDto.title ) {
      updateCrudNoteDto.title = updateCrudNoteDto.title;
    }
    if( updateCrudNoteDto.description ) {
      updateCrudNoteDto.description = updateCrudNoteDto.description;
    }

    const updateNote = await note.updateOne( updateCrudNoteDto, {new: true});
    
    return {...updateNote.toJSON, ...updateCrudNoteDto};
  }

  async remove(id: string) {
    const { deletedCount } = await this.notesModel.deleteOne({ id });
    if( deletedCount === 0)
      throw new BadRequestException(`Note with id "${ id }" not found`);
    return;
  }
}
