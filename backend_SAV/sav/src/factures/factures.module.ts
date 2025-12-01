import { Module } from '@nestjs/common';
import { FacturesService } from './factures.service';
import { FacturesController } from './factures.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Facture ,FactureSchema} from './schemas/facture.schema';

@Module({
  imports:[MongooseModule.forFeature([
      { name: Facture.name, schema: FactureSchema }
    ])
  ],
  controllers: [FacturesController],
  providers: [FacturesService],
})
export class FacturesModule {}
