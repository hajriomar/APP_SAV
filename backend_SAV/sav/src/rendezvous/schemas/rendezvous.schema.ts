import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {RendezVousEtat} from '../type/enum/rendezvous_etat.enum';

@Schema({

  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class RendezVous extends Document {

  create_date: Date;
  update_date: Date;

  @Prop({ type: Types.ObjectId, ref: "Utilisateur" })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Vehicule" })
  vehicule_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Atelier" })
  atelier_id: Types.ObjectId;

  @Prop()
  type_rdv: string;

  @Prop()
  date: Date;

  @Prop()
  heure: string;

  @Prop()
  message: string;

  @Prop({
    type: String,
    enum: RendezVousEtat,
    default: RendezVousEtat.EN_ATTENTE,
  })
  etat: RendezVousEtat;
}

export const RendezVousSchema = SchemaFactory.createForClass(RendezVous);
