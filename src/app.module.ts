import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeController } from './code/code.controller';
import { JwtService } from '@nestjs/jwt';
import { PersonnelController } from './personnel/personnel.controller';

@Module({
  imports: [],
  controllers: [AppController, CodeController, PersonnelController],
  providers: [AppService, JwtService],
})
export class AppModule {}
