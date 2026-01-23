import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginRepository } from "./login.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService{
    constructor(private readonly loginRepository: LoginRepository, private readonly jwtService: JwtService){}

    /*
    use only to create users and then comment

    async create(body: LoginDto){
        const create = await this.loginRepository.create(body)
    }
    */

    async login(body: LoginDto){
        const {email, password} = body

        try{
            const user = await this.loginRepository.findLogin(email)
            
            if (!user){
                throw new UnauthorizedException("Erro ao realizar Login!")
            }

            const verifyPassword = await bcrypt.compare(password, user.password)
            
            if (!verifyPassword){
                throw new UnauthorizedException("Erro ao realizar Login!")
            }

            const payload = { sub: user.id, email: user.email, role: user.role }
            const token = this.jwtService.sign(payload)

            return token
        }catch(e){
            throw new InternalServerErrorException("Erro ao realizar Login!")
        }
    }
}