import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PolosModule } from './app/polos/polos.module';
import { RegistrationModule } from './app/registration/registration.module';
import { UsersModule } from './app/users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: false,
      logging:true
    }),
    PolosModule,
    RegistrationModule,
    UsersModule
    
  ]

})
export class AppModule {}
