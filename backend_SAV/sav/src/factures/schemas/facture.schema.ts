import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {FactureEtat} from '../types/enum/facture_etat.enum';

@Schema({
  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class Facture extends Document {

  create_date: Date;
  update_date: Date;
  
  @Prop({ type: Types.ObjectId, ref: "RendezVous" })
  rdv_id: Types.ObjectId;

  @Prop()
  montant: number;

  @Prop({ default: new Date() })
  date_facture: Date;

  @Prop({
    type: String,
    enum: FactureEtat,
    default: FactureEtat.NON_PAYEE,
  })
  etat: FactureEtat;


}

export const FactureSchema = SchemaFactory.createForClass(Facture);
