import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    UserModule,
    WorkspaceModule,
  ],
  exports: [
    UserModule,
    WorkspaceModule,
  ],
})
export class ModulesModule {}