import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Utilisateur,UtilisateurSchema} from './schemas/utilisateur.schema';

@Module({
  imports:[MongooseModule.forFeature([
      { name: Utilisateur.name, schema: UtilisateurSchema }
    ])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
})
export class UtilisateurModule {}
