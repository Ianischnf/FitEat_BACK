import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class RegisterService{

    constructor(
        private usersService : UsersService,
        private jwtService   : JwtService
    ) {}
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
    
        const payload = { sub: user._id, email: user.email, role: 'user' }
        const access_token = this.jwtService.sign(payload);
    
        return {
            message : 'Inscription réussi',
            access_token,
            user : {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
      }
}
