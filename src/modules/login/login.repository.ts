import { Injectable } from "@nestjs/common";
import { prisma } from "prisma/cliente";
import { forgottenPasswordDto } from "./dto/forgottenPassword.dto";
//import { LoginDto } from "./dto/login.dto";
//import * as bcrypt from "bcrypt";

@Injectable()
export class LoginRepository{
    /*
    use only to create users and then comment

    async create(body: LoginDto){
        const hash = await bcrypt.hash(body.password, 10)
        return await prisma.user_companies.create({data: {email: body.email, password: hash, role: body.role, companie: body.companie}})
    }
    */

    async findLogin(email: string){
        const findMany = await prisma.user_companies.findUnique({where : {email}})
        return findMany
    }

    async createCode(data: {id_user: string, companie: string, email: string, role: string, code: string, expiresAt: Date}){
        return await prisma.forgot_password.create({data})
    }

    async verifyCode(id: string){
        return await prisma.forgot_password.findUnique({where: {id}})
    }

    async attempts(id: string){
        return await prisma.forgot_password.update({where: {id}, data: {attempts : {increment: 1}}})
    }

    async usedTrue(id: string){
        return await prisma.forgot_password.update({where: {id}, data: {used : true}})
    }

    async findUser(id_user: string){
        return await prisma.user_companies.findUnique({where : {id: id_user}})
    }

    async resetPassword(id: string, hash: string){
        return await prisma.user_companies.updateMany({where: {id}, data: {password: hash}})
    }
}