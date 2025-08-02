import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    UserModule,
    WorkspaceModule,
    AuthModule
  ],
  exports: [
    UserModule,
    WorkspaceModule,
  ],
})
export class ModulesModule {}