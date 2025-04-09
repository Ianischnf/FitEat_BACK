import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CoachesService } from "./coaches.service";
import { CreateCoachDto } from "./dto/create-coach.dto";
import { Coach } from "./schema/coach.schema";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/custom_decorator/roles/roles.guard";
import { Roles } from "src/custom_decorator/roles/roles.decorator";

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService : CoachesService) {}

    @Get()
    async findAll() : Promise<Coach[]> {
        return this.coachesService.findAll()
    }

   @UseGuards(AuthGuard('jwt'), RolesGuard)
   @Roles('coach')
   @Post()
    async createCoach(@Body() coachData : CreateCoachDto) : Promise<Coach> {
        return this.coachesService.createCoach(coachData);
    }

    @Get('id')
    async findOne(@Param('id') id : string) {
        return this.coachesService.findOne(id);
    }

    @Delete('id')
    async remove(@Param('id') id : string) {
        return this.coachesService.remove(id);
    }

}