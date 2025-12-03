import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  
  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class Technicien extends Document {

  create_date: Date;
  update_date: Date;
  
  @Prop()
  nom: string;

  @Prop()
  prenom: string;

  @Prop()
  specialite: string;
}

export const TechnicienSchema = SchemaFactory.createForClass(Technicien);
