import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginRepository } from "./login.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { forgottenPasswordDto } from "./dto/forgottenPassword.dto";
import { randomInt } from "crypto";
import { MailService } from "../mails/mail.service";

@Injectable()
export class LoginService{
    constructor(private readonly loginRepository: LoginRepository, private readonly jwtService: JwtService, private readonly mailService: MailService){}

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

    async forgottenPassword(body: forgottenPasswordDto){
        const {email} = body
        
        try{
            const user = await this.loginRepository.findLogin(email)

            if(!user){
                return 'Se o email existir, você receberá um link'
            }

            const code = randomInt(0, 10000).toString().padStart(4, '0')

            const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

            await this.loginRepository.createCode({
                    id_user: user.id,
                    companie: user.companie,
                    email: user.email,
                    role: user.role,
                    code: code,
                    expiresAt: expiresAt
                }
            )

            await this.mailService.sendResetCode(user.email, code)

            console.log("cheguei aqui")
            return 'Se o email existir, você receberá um link'
            
        }catch(e){
            return "Se o email existir, você receberá um link"
        }
    }
}