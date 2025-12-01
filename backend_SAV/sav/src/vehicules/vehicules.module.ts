import { Module } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { VehiculesController } from './vehicules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Vehicule,VehiculeSchema} from './schemas/vehicule.schema';

@Module({
  imports : [MongooseModule.forFeature([
      { name: Vehicule.name, schema: VehiculeSchema }
    ])],
  controllers: [VehiculesController],
  providers: [VehiculesService],
})
export class VehiculesModule {}
