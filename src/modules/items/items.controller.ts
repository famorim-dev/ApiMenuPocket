import {Post, Body, Controller } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { ItemsService } from "./items.service";


@Controller('items')
export class ItemsController{
    constructor(private readonly itemsService: ItemsService){}

    @Post()
    create(@Body() body: CreateDto){
        return this.itemsService.create(body)
    }
}