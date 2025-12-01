import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import{UserRole} from '../type/enum/role.enum'

@Schema()
export class Utilisateur extends Document {
  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  email: string;

  @Prop()
  tel: string;

  @Prop()
  adresse: string;

  @Prop({ default: "client" })
  role: UserRole; // "admin", "client" 
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);
