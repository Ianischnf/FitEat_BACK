import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Post()
    async createUser(@Body() userData : CreateUserDto) {
        return this.usersService.createUser(userData)
    }



}