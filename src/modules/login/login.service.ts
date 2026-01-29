import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { LoginRepository } from "./login.repository";
import { JwtService } from "@nestjs/jwt";
import { forgottenPasswordDto } from "./dto/forgottenPassword.dto";
import { randomInt } from "crypto";
import { MailService } from "../mails/mail.service";
import { validatePasswordDto } from "./dto/validatePassword.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import * as bcrypt from "bcrypt";

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

            const payload = { id: user.id, email: user.email, role: user.role, plan: user.plan }
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

            const registerCode = await this.loginRepository.createCode({
                    id_user: user.id,
                    companie: user.companie,
                    email: user.email,
                    role: user.role,
                    code: code,
                    expiresAt: expiresAt
                }
            )

            await this.mailService.sendResetCode(user.email, code)

            return registerCode.id

        }catch(e){
            return "Se o email existir, você receberá um link"
        }
    }

    async verifyCode(body: validatePasswordDto){
        const {code, id} = body

        try{
            await this.loginRepository.attempts(id)
            
            const validate = await this.loginRepository.verifyCode(id)

            if(!validate){
                throw new UnauthorizedException("Não existe codigo para seu Usuario")
            }

            if(validate.attempts >= 7){
                await this.loginRepository.usedTrue(id)
                throw new UnauthorizedException("Numero de tentativas esgotadas, tente novamente mais tarde!")
            }
            
            if (validate.code !== code ){
                throw new UnauthorizedException("Codigo Invalido")
            }
            
            if (validate.used){
                throw new UnauthorizedException("Codigo Ja está em uso")
            }
            
            if(validate.expiresAt < new Date()){
                throw new UnauthorizedException("Codigo expirado")
            }

            return {id:validate.id, id_user: validate.id_user}
        }catch(e){
            if( e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro Interno do Servidor")
        }
    }

    async resetPassword(body: ResetPasswordDto){
        const {id,id_user, password} = body

        try{
            const user = await this.loginRepository.findUser(id_user)

            if(!user){
                throw new UnauthorizedException("Não foi possivel alterar a senha")
            }

            const code = await this.loginRepository.verifyCode(id)

            if (!code){
                throw new UnauthorizedException("Codigo Inexistente")
            }

            if (code.used){
                throw new UnauthorizedException("Codigo Ja está em uso")
            }

            const hash = await bcrypt.hash(password, 10)
            const resetPassword = this.loginRepository.resetPassword(id_user, hash)

            if (!resetPassword){
                throw new UnauthorizedException("Não foi possivel alterar a senha")
            }

            await this.loginRepository.usedTrue(id)

            return "Sua senha foi atualizada!"
        }catch(e){
            if( e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro Interno do Servidor")
        }
    }
}