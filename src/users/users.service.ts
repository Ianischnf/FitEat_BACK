import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async createUser(userData : CreateUserDto) : Promise <User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = new this.userModel({...userData, password : hashedPassword});
        return newUser.save();
    }

    async findByEmail(email : string) : Promise<User | null> {
        return this.userModel.findOne({ email }).exec()
    }
}