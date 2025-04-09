import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
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

    @Put(':id/assign-coach')
    async assignCoach(
        @Param('id') userId: string,
        @Param('coachId') coachId: string
    ){
        return this.usersService.assignCoach(userId, coachId);
    }

}