import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CoachesService } from "src/coaches/coaches.service";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/schemas/user.schema";
import { LoginDto } from "./dto/login.dto";


@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private coachesService : CoachesService,
        private jwtService: JwtService
    ) {}

    async validatedUserOrCoach(dto : LoginDto):  Promise<User | null>{
        const { email, password } = dto
        const user = await this.usersService.findByEmail(dto.email);

        if(user && await bcrypt.compare(password, user.password)) {
            return { ...user.toObject(), role: 'user' };
        }

        const coach = await this.coachesService.findByEmail(dto.email)

        if( coach && await bcrypt.compare(password, coach.password)) {
            return { ...coach.toObject(), role : 'coach'}
        }

        return null;
    }

    async login(user: any) {
        const payload = { sub: user._id, email: user.email, role: user.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

      async register(dto : LoginDto){
        const existing = await this.usersService.findByEmail(dto.email);

        if (existing) {
            throw new Error("L'utilisateur existe déjà");
        }
      }
    
}