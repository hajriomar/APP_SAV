import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class Vehicule extends Document {

  create_date: Date;
  update_date: Date;
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

  @Prop({ type: Types.ObjectId, ref: "Utilisateur" })
  user_id: Types.ObjectId;
}

export const VehiculeSchema = SchemaFactory.createForClass(Vehicule);
