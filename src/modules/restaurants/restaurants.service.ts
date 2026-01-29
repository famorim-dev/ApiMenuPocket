import { HttpException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { prisma } from "prisma/cliente";
import { StatusDto } from "./dto/status.dto";
import { JwtUser } from "src/auth/types/jwt.types";

export class RestaurantsService{


    async create(user: JwtUser , Body: CreateDto){
        const {name, banner, photo, address, cnpj, telephone, city, website} = Body

        try{
            const getUser = await prisma.user_companies.findUnique({where: {id: user.id}})

            if(!getUser){
                throw new UnauthorizedException("Usuario Não encontrado")
            }

            if (user.role !== "admin"){
                throw new UnauthorizedException("Somente Admin podem registrar novos restaurantes")
            }

            await prisma.restaurants.create({data: {id_user: user.id, companie: getUser.companie, name, banner, photo, address, cnpj, telephone, plan:user.plan, city, website}})

            return "Restaurante Criado!"
        }catch(e){
            if (e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro interno no Servidor")
        }
    }

    async status(user: JwtUser, Body: StatusDto){
        const {id, status} = Body

        try{
            if (user.role !== "admin"){
                throw new UnauthorizedException("Somente Admin podem registrar novos restaurantes")
            }

            const restaurants = await prisma.restaurants.findUnique({where : {id}})
            if (!restaurants){
                throw new UnauthorizedException("Restaurante não encontrado")
            }

            await prisma.restaurants.update({where: {id: restaurants.id}, data: {status: status}})
            
            return "Status Atualizado"
        }catch(e){
            if (e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro interno no Servidor")
        }
    }
}