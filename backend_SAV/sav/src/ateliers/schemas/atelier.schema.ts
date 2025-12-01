import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Atelier extends Document {

  @Prop()
  specialite: string;

  @Prop({ default: true })
  disponibilite: boolean;

  @Prop({ type: Types.ObjectId, ref: "Technicien" })
  technicien_id: Types.ObjectId;
}

export const AtelierSchema = SchemaFactory.createForClass(Atelier);
