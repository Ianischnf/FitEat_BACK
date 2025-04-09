import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({ required : true})
    name: string;

    @Prop({required : true, unique: true})
    email : string;

    @Prop({ required : true})
    password : string;

    @Prop({ default: Date.now })
    registration_date?: Date;
    
    @Prop({ default: null })
    last_login?: Date;

    @Prop({ default: ['user', 'admin']})
    role : string;
    
    // Attribué un coach à un user (relation mongoDB)
    @Prop({ type: Types.ObjectId, ref: 'Coach'})
    coach : Types.ObjectId

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