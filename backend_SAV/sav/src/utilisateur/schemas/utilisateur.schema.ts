import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import{UserRole} from '../type/enum/role.enum'

@Schema({
  timestamps: {
    createdAt: 'create_date',
    updatedAt: 'update_date',
  },
})
export class Utilisateur extends Document {
  
  create_date: Date;
  update_date: Date;

  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  tel: string;

  @Prop()
  adresse: string;

  @Prop({ default: false })
  verifier: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole; 
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);
