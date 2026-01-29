import {Post, Body, Controller } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";


@Controller('items')
export class ItemsController{
    constructor(){}

    @Post()
    create(@Body() body: CreateDto){
        return
    }
}