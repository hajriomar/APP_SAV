import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class RendezVous extends Document {

  @Prop({ type: Types.ObjectId, ref: "User" })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Vehicule" })
  vehicule_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Atelier" })
  atelier_id: Types.ObjectId;

  @Prop()
  type_rdv: string;

  @Prop()
  date: string;

  @Prop()
  heure: string;

  @Prop()
  message: string;

  @Prop({ default: "en_attente" })
  etat: string;
}

export const RendezVousSchema = SchemaFactory.createForClass(RendezVous);
