import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { LoginDto } from "./dto/login.dto";
import { forgottenPasswordDto } from "./dto/forgottenPassword.dto";

import { LoginService } from "./login.service";
import { validatePasswordDto } from "./dto/validatePassword.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";

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

    @Post('validate-password')
    @HttpCode(200)
    verifyCode(@Body() body: validatePasswordDto){
        return this.loginService.verifyCode(body)
    }

    @Post('reset-paswword')
    @HttpCode(200)
    resetPassword(@Body() body: ResetPasswordDto){
        return this.loginService.resetPassword(body)
    }
}