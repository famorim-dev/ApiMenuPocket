import { Body, Controller, Post } from "@nestjs/common";
import { CreateDto } from "./dto/create.dto";
import { RestaurantsService } from "./restaurants.service";


@Controller("restaurants")
export class RestaurantsController{
    constructor(private readonly restaurantsService: RestaurantsService){}

    @Post("create")
    create(@Body() Body: CreateDto){
        return this.restaurantsService.create(Body)
    }
}