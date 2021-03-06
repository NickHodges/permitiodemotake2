import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from 'src/app.service';
import { Permissions } from '../permissions.decorator';
import { PermissionsGuard } from '../permissions.guard';
@Controller('code')
export class CodeController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('read')
  @Permissions('code:read')
  async read(): Promise<string> {
    return 'You are authorized to read code from here';
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('write')
  @Permissions('code:write')
  async write(): Promise<string> {
    return 'You are authorized to  write code from here';
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('review')
  @Permissions('code:review')
  async review(): Promise<string> {
    return 'You are authorized to  review code from here';
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get('commit')
  @Permissions('code:commit')
  async commit(): Promise<string> {
    return 'You are authorized to  commit code from here';
  }
}
