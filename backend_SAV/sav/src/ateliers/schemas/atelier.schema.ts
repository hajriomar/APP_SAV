import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({

  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class Atelier extends Document {

  create_date: Date;
  update_date: Date;

  @Prop()
  specialite: string;

  @Prop({ default: true })
  disponibilite: boolean;

  @Prop({ type: Types.ObjectId, ref: "Technicien" })
  technicien_id: Types.ObjectId;
}

export const AtelierSchema = SchemaFactory.createForClass(Atelier);
