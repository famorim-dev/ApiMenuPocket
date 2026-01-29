import { HttpException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { prisma } from "prisma/cliente";
import { StatusDto } from "./dto/status.dto";



export class RestaurantsService{


    async create(Body: CreateDto){
        const {id_user, name, banner, photo, address, cnpj, telephone, city, website} = Body

        try{
            const user = await prisma.user_companies.findUnique({where: {id: id_user}})

            if (!user){
                throw new UnauthorizedException("Usuario não encontrado")
            }

            if (user.role !== "admin"){
                throw new UnauthorizedException("Somente Admin podem registrar novos restaurantes")
            }

            await prisma.restaurants.create({data: {id_user, companie:user.companie, name, banner, photo, address, cnpj, telephone, plan:user.plan, city, website}})

            return "Restaurante Criado!"
        }catch(e){
            if (e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro interno no Servidor")
        }
    }


    async status(Body: StatusDto){
        const {id, id_user, status} = Body

        try{
            const user = await prisma.user_companies.findUnique({where: {id: id_user}})

            if (!user){
                throw new UnauthorizedException("Usuario não encontrado")
            }

            if (user.role !== "admin"){
                throw new UnauthorizedException("Somente Admin podem registrar novos restaurantes")
            }

            const restaurants = await prisma.restaurants.findUnique({where : {id}})
            if (!restaurants){
                throw new UnauthorizedException("Restaurante não encontrado")
            }

            await prisma.restaurants.update({where: {id: restaurants.id}, data: {status: status}})
            
            return "status Atualizado"

        }catch(e){
            if (e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro interno no Servidor")
        }
    }
}