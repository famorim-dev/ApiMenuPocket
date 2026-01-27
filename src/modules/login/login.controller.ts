import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { LoginDto } from "./dto/login.dto";
import { forgottenPasswordDto } from "./dto/forgottenPassword.dto";

import { LoginService } from "./login.service";

@Controller("login")
export class LoginController{
    constructor(private readonly loginService: LoginService){}
    
    @Post()
    @HttpCode(200)
    login(@Body() body: LoginDto){
        return this.loginService.login(body)
    }

    @Post('forgot-password')
    @HttpCode(200)
    forgottenPassword(@Body() body: forgottenPasswordDto){
        return this.loginService.forgottenPassword(body)
    }
}