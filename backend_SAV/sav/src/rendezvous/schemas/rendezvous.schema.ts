import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RendezVousEtat } from '../type/enum/rendezvous_etat.enum';

@Schema({
  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class RendezVous extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Utilisateur', required: true })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Vehicule', required: true })
  vehicule_id: Types.ObjectId;

  //@Prop({ type: Types.ObjectId, ref: 'Atelier', required: true })
  //atelier_id: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop()
  heure: string;

  @Prop()
  type_rdv: string;

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
