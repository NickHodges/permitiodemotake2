import { Injectable } from '@nestjs/common';
import { Dict } from 'permitio/build/main/utils/dict';
import { permit } from './permitio';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  promoteUser(): Promise<Dict[]> {
    permit.write(
      permit.api.unassignRole('marvin@themartian.com', 'JrDev', 'default'),
    );
    const userInfo = permit.write(
      permit.api.assignRole('marvin@themartian.com', 'SrDev', 'default'),
    );
    return userInfo;
  }

  demoteUser(): Promise<Dict[]> {
    permit.write(
      permit.api.unassignRole('marvin@themartian.com', 'SrDev', 'default'),
    );
    const userInfo = permit.write(
      permit.api.assignRole('marvin@themartian.com', 'JrDev', 'default'),
    );
    return userInfo;
  }
}
