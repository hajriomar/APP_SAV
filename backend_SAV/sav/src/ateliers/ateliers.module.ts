import { Module } from '@nestjs/common';
import { AteliersService } from './ateliers.service';
import { AteliersController } from './ateliers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Atelier ,AtelierSchema} from "./schemas/atelier.schema"

@Module({
  imports: [MongooseModule.forFeature([
      { name: Atelier.name, schema: AtelierSchema }
    ])
  ],
  controllers: [AteliersController],
  providers: [AteliersService],
})
export class AteliersModule {}
