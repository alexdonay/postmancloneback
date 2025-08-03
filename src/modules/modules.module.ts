import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthModule } from './infra/auth/auth.module';
import { RequestGroupModule } from './request-group/request-group.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    UserModule,
    WorkspaceModule,
    AuthModule,
    RequestGroupModule,
    RequestModule

  ],
  exports: [
    UserModule,
    WorkspaceModule,
    RequestGroupModule,
    RequestModule,
  ],
})
export class ModulesModule {}