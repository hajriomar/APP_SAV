import { Module } from '@nestjs/common';
import { TechniciensService } from './techniciens.service';
import { TechniciensController } from './techniciens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Technicien , TechnicienSchema} from './schemas/technicien.schema';

@Module({
  imports:[MongooseModule.forFeature([
      { name: Technicien.name, schema: TechnicienSchema }
    ])],
  controllers: [TechniciensController],
  providers: [TechniciensService],
})
export class TechniciensModule {}
