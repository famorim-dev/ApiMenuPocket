import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { RestaurantsService } from "./restaurants.service";
import { StatusDto } from "./dto/status.dto";
import { JwtUser } from "src/auth/types/jwt.types";
import { prisma } from "prisma/cliente";


@Controller("restaurants")
export class RestaurantsController{
    constructor(private readonly restaurantsService: RestaurantsService){}

    @Post("create")
    create(@Req() req: Request & {user: JwtUser}, @Body() Body: CreateDto){
        return this.restaurantsService.create(req.user, Body)
    }

    @Post("status")
    status(@Req() req: Request & {user: JwtUser}, @Body() Body: StatusDto){
        return this.restaurantsService.status(req.user, Body)
    }

    @Get('get')
    async getRestaurants(@Req() req: Request & {user: JwtUser}){
        return prisma.restaurants.findMany({where: {id_user: req.user.id}, select: {companie: true, name: true, banner: true, photo: true, address: true, cnpj: true, telephone: true, status: true, plan: true, city: true, website: true}})
    }
}