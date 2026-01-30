import {Post, Body, Controller, Get, Req, Param } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { ItemsService } from "./items.service";
import { prisma } from "prisma/cliente";


@Controller('items')
export class ItemsController{
    constructor(private readonly itemsService: ItemsService){}

    @Post()
    create(@Body() body: CreateDto){
        return this.itemsService.create(body)
    }

    @Get('get/:id')
    get(@Param('id') param: string){
        return prisma.items.findMany({where: {id_restaurants: param}, select:{name_restaurants: true, name: true, value: true, description: true, category: true, promotion: true, value_promotion: true, highlight: true}})
    }
}