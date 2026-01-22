import { Injectable } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class LoginService{

    async login(body: LoginDto){
        const {email, password} = body

        
    }
}