import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Technicien extends Document {

  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  specialite: string;
}

export const TechnicienSchema = SchemaFactory.createForClass(Technicien);
