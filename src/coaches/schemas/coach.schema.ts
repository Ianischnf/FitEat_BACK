import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Coach extends Document {
    @Prop({ required : true})
    coachFirstName: string;

    @Prop({ required : true})
    coachLastName: string;

    @Prop({required : true, unique: true})
    coachEmail : string;

    @Prop({ required : true})
    speciality : string;

    @Prop({ required : true})
    description : string;

}

export const CoachSchema = SchemaFactory.createForClass(Coach);