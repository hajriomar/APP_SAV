import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Reclamation extends Document {

  @Prop({ type: Types.ObjectId, ref: "User" })
  user_id: Types.ObjectId;

  @Prop()
  sujet: string;

  @Prop()
  message: string;

  @Prop({ default: new Date() })
  date: Date;

  @Prop({ default: "en_attente" })
  etat: string;
}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);
