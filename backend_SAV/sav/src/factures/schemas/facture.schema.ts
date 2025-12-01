import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Facture extends Document {

  @Prop({ type: Types.ObjectId, ref: "RendezVous" })
  rdv_id: Types.ObjectId;

  @Prop()
  montant: number;

  @Prop({ default: new Date() })
  date_facture: Date;
}

export const FactureSchema = SchemaFactory.createForClass(Facture);
