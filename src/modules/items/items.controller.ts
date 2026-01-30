import {Post, Body, Controller, Get, Req, Param, Patch } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { ItemsService } from "./items.service";
import { prisma } from "prisma/cliente";
import { UpdateDto } from "./dto/update.dto";


@Controller('items')
export class ItemsController{
    constructor(private readonly itemsService: ItemsService){}

    @Post()
    create(@Body() body: CreateDto){
        return this.itemsService.create(body)
    }

    @Get('get/:id')
    get(@Param('id') param: string){
        return prisma.items.findMany({where: {id_restaurants: param}, select:{id: true, name_restaurants: true, name: true, value: true, description: true, category: true, promotion: true, value_promotion: true, highlight: true}})
    }

    @Patch('update/:id')
    update(@Param('id') param: string,@Body() body: UpdateDto){
        return this.itemsService.update(param, body)
    }
}