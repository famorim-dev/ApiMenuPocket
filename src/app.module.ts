import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';
import { JwtStrategy } from './auth/jwt.estrategy';
import { PassportModule } from '@nestjs/passport';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'}), ConfigModule.forRoot({isGlobal: true}), LoginModule, RestaurantsModule, ItemsModule],
  controllers: [],
  providers: [{provide: APP_GUARD, useClass: JwtAuthGuard}, JwtStrategy],
  exports: [PassportModule],
})
export class AppModule {}
