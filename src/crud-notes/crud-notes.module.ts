import { Module } from '@nestjs/common';
import { CrudNotesService } from './crud-notes.service';
import { CrudNotesController } from './crud-notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CrudNote, NotesSchema } from './entities/crud-note.entity';

@Module({
  controllers: [CrudNotesController],
  providers: [CrudNotesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: CrudNote.name,
        schema: NotesSchema,
      }
    ])
  ],
  exports: [
    CrudNotesService
  ]
})
export class CrudNotesModule {}
