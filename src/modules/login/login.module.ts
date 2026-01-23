import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { LoginRepository } from "./login.repository";

import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({ secret: process.env.JWT_SECRET,  signOptions: { expiresIn: '1h' }, }),],
    controllers:[LoginController],
    providers:[LoginService, LoginRepository]
})
export class LoginModule{}