import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WebsocketServerModule } from './websocket-server/websocket-server.module';
import { CrudNotesModule } from './crud-notes/crud-notes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ 
      ServeStaticModule.forRoot({  
           rootPath: join(__dirname,'..','public'), 
      }), 
      
      MongooseModule.forRoot('mongodb://localhost:27017/crud-notes'),

      WebsocketServerModule,
      
      CrudNotesModule
  ]
})
export class AppModule {}
