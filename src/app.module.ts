import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';

@Module({
  imports: [LoginModule, RestaurantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
