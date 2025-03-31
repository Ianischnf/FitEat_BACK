import { Body, Controller, Post } from "@nestjs/common"
import { RegisterService } from "./register-service"
import { CreateUserDto } from "src/users/dto/create-user.dto"

@Controller('register')
export class RegisterController{
    constructor(private registerService : RegisterService) {}

    @Post()
    async register(@Body() createUserDto: CreateUserDto){
        return this.registerService.register(createUserDto)
    }   
}
