import { Module } from '@nestjs/common';
import { RendezvousService } from './rendezvous.service';
import { RendezvousController } from './rendezvous.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {RendezVous , RendezVousSchema} from './schemas/rendezvous.schema';

@Module({
  imports:[MongooseModule.forFeature([
      { name: RendezVous.name, schema: RendezVousSchema }
    ])],
  controllers: [RendezvousController],
  providers: [RendezvousService],
})
export class RendezvousModule {}
