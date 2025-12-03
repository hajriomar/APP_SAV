import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {ReclamationEtat} from '../type/enum/reclamation_etat.enum';

@Schema({
  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class Reclamation extends Document {

  create_date: Date;
  update_date: Date;
  
  @Prop({ type: Types.ObjectId, ref: "User" })
  user_id: Types.ObjectId;

  @Prop()
  sujet: string;

  @Prop()
  message: string;

  @Prop({ default: new Date() })
  date: Date;

@Prop({
    type: String,
    enum: ReclamationEtat,
    default: ReclamationEtat.NON_TRAITEE,
  })
  etat: ReclamationEtat;
}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);
