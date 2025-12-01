import { Module } from '@nestjs/common';
import { ReclamationsService } from './reclamations.service';
import { ReclamationsController } from './reclamations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Reclamation ,ReclamationSchema} from './schemas/reclamation.schema';

@Module({
  imports:[MongooseModule.forFeature([
      { name: Reclamation.name, schema: ReclamationSchema }
    ])],
  controllers: [ReclamationsController],
  providers: [ReclamationsService],
})
export class ReclamationsModule {}
