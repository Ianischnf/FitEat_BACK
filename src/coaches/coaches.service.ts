import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Coach } from "./schemas/coach.schema";
import { Model } from "mongoose";

@Injectable()
export class CoachesService{
    constructor(@InjectModel(Coach.name) private coachModel: Model<Coach>) {}

    async findAll(): Promise<Coach[]> {
        return this.coachModel.find().exec();
    }

    async createCoach(coachData : any) : Promise<Coach> {
        const createCoach = new this.coachModel(coachData);
        return createCoach.save();
    }
}