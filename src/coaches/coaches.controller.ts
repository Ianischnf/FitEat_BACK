import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CoachesService } from "./coaches.service";
import { CreateCoachDto } from "./dto/create-coach.dto";
import { Coach } from "./schema/coach.schema";

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService : CoachesService) {}

    @Get()
    async findAll() : Promise<Coach[]> {
        return this.coachesService.findAll()
    }

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