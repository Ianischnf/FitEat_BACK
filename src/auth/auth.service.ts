import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CoachesService } from "src/coaches/coaches.service";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/schemas/user.schema";
import { LoginDto } from "./dto/login.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";


@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private coachesService : CoachesService,
        private jwtService: JwtService
    ) {}

    async validatedUserOrCoach(dto : LoginDto):  Promise<User | null>{
        const user = await this.usersService.findByEmail(dto.email);

        if(user && await bcrypt.compare(dto.password, user.password)) {
            return { ...user.toObject(), role: 'user' };
        }

        const coach = await this.coachesService.findByEmail(dto.email)

        if( coach && await bcrypt.compare(dto.password, coach.password)) {
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

      async register(dto : CreateUserDto){
        const existing = await  this.usersService.findByEmail(dto.email)

        if(existing){
            throw new ConflictException("Un utilisateur avec cet email existe déjà");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user           = await this.usersService.createUser({
            ...dto,
            password: hashedPassword,
        });

        return {
            message : 'Inscription réussi',
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
      }
    
}