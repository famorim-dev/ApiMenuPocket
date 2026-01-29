import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { RestaurantsService } from "./restaurants.service";
import { StatusDto } from "./dto/status.dto";
import { JwtUser } from "src/auth/types/jwt.types";


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
}