import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required : true})
    nom: string;

    @Prop({required : true, unique: true})
    email : string;

    @Prop({ required : true})
    password : string;

    @Prop({ required : true})
    registration_date : Date;

    @Prop({ required : true})
    last_login : Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: "Coach" }] })
    coaches: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: "TrainingProgram" }] })
    trainingPrograms: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: "Order" }] })
    orders: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: "PhysicalCondition" })
    physicalCondition: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "DietPreference" })
    dietPreference: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);