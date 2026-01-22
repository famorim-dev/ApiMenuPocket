import { Body, Controller, Post } from "@nestjs/common";

import { LoginDto } from "./dto/login.dto";

@Controller("login")
export class LoginController{

    @Post()
    login(@Body() body: LoginDto){
        return "chamando login"
    }
}