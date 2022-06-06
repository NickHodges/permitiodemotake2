import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeController } from './code/code.controller';
import { JwtModule } from '@nestjs/jwt';
import { PersonnelController } from './personnel/personnel.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [AuthModule, JwtModule],
  controllers: [AppController, CodeController, PersonnelController],
  providers: [AppService],
})
export class AppModule {}
