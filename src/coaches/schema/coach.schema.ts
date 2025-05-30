import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Coach extends Document {
    @Prop({ required : true})
    name: string;

    @Prop({ required : true, unique : true})
    email: string;

    @Prop({ required : true})
    password : string;

    @Prop({ required : true})
    speciality : string;

    @Prop()
    description?: string;

    @Prop({ type: Object }) // affiner selon la structure JSON si tu veux
    disponibilite?: Record<string, any>;

    @Prop({ default : 'coach'})
    role: string;

}

export const CoachSchema = SchemaFactory.createForClass(Coach);