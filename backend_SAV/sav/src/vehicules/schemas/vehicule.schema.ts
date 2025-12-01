import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Vehicule extends Document {

  @Prop({ required: true })
  immatriculation: string;

  @Prop({ required: true })
  marque: string;

  @Prop({ required: true })
  modele: string;

  @Prop()
  annee: number;

  @Prop()
  couleur: string;

  @Prop()
  km: number;

  @Prop({ type: Types.ObjectId, ref: "User" })
  user_id: Types.ObjectId;
}

export const VehiculeSchema = SchemaFactory.createForClass(Vehicule);
