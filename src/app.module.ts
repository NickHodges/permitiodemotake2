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

// const options: Auth0Options = {
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   audience: process.env.AUTH0_AUDIENCE,
// };

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [AppController, CodeController, PersonnelController],
  providers: [
    AppService,

  ],
})
export class AppModule {}
