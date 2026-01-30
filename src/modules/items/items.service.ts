import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { prisma } from "prisma/cliente";
import { UpdateDto } from "./dto/update.dto";


@Injectable()
export class ItemsService{

    async create(body: CreateDto){
        try{
            const restaurant = await prisma.restaurants.findUnique({where: {id: body.id_restaurants}})

            if(!restaurant){
                throw new BadRequestException("Restaurante Não existe")
            }

            await prisma.items.create({data: {id_restaurants: body.id_restaurants, name_restaurants: restaurant.name, name: body.name, value: body.value, description: body.description, category: body.category, promotion: body.promotion, value_promotion: body.value_promotion, highlight: body.highlight}})

            return "Item criado"
        }catch(e){
            if(e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro interno Do Servidor")
        }
    }

    async update(param: string, body: UpdateDto){
        try{
            await prisma.items.update({where: {id: param}, data: {name: body.name, value: body.value, description: body.description, category: body.category, promotion: body.promotion, value_promotion: body.value_promotion, highlight: body.highlight}})

            return "Item Atualizado"
        }catch(e){
            if(e instanceof HttpException){
                throw e
            }
            throw new InternalServerErrorException("Erro interno Do Servidor")
        }
    }
}