import { Injectable } from "@nestjs/common";
import { prisma } from "prisma/cliente";
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
}