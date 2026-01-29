import { Body, Controller, Post } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { RestaurantsService } from "./restaurants.service";
import { StatusDto } from "./dto/status.dto";


@Controller("restaurants")
export class RestaurantsController{
    constructor(private readonly restaurantsService: RestaurantsService){}

    @Post("create")
    create(@Body() Body: CreateDto){
        return this.restaurantsService.create(Body)
    }

    @Post("status")
    status(@Body() Body: StatusDto){
        return this.restaurantsService.status(Body)
    }
}