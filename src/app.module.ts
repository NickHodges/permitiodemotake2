import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeController } from './code/code.controller';
import { JwtModule } from '@nestjs/jwt';
import { PersonnelController } from './personnel/personnel.controller';
//import { Auth0Module, Auth0Options } from '@webundsoehne/nestjs-auth0-guard';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [AppController, CodeController, PersonnelController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
