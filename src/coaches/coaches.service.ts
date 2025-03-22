import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Coach } from "./schema/coach.schema";
import { Model } from "mongoose";
import { CreateCoachDto } from "./dto/create-coach.dto";

@Injectable()

export class CoachesService{
    constructor(@InjectModel(Coach.name) private coachModel: Model<Coach>){}

    async findAll() : Promise<Coach[]> {
        return this.coachModel.find().exec()
    }

    async createCoach( coachData : CreateCoachDto) : Promise<Coach> {
        const newCoach = new this.coachModel(coachData);
        return newCoach.save();
    }

    async findOne(id : string) : Promise<Coach | null> {
        return this.coachModel.findById(id).exec();
    }

    async remove(id : string) : Promise<Coach | null> {
        return this.coachModel.findByIdAndDelete(id).exec()
    }

}