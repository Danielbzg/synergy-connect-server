import { Module } from '@nestjs/common';
import { WebsocketServerService } from './websocket-server.service';
import { WebsocketServerGateway } from './websocket-server.gateway';
import { CrudNotesModule } from 'src/crud-notes/crud-notes.module';

@Module({
  providers: [WebsocketServerGateway, WebsocketServerService],
  imports: [ CrudNotesModule ]
})
export class WebsocketServerModule {}
