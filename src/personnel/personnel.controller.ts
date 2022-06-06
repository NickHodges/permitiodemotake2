import { Controller, Get, UseGuards } from '@nestjs/common';
import { Dict } from 'permitio/build/main/utils/dict';
import { Permissions } from '../permissions.decorator';
import { PermissionsGuard } from '../permissions.guard';
import { AppService } from 'src/app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('promote')
  @Permissions('personnel:promote')
  promoteUser(): Promise<Dict[]> {
    return this.appService.promoteUser();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('demote')
  @Permissions('personnel:demote')
  demoteUser(): Promise<Dict[]> {
    return this.appService.demoteUser();
  }
}
