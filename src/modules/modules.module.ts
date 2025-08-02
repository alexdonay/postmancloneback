import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [
    AuthModule,      // <-- Tenho quase certeza que esta linha está faltando no seu arquivo.
    UserModule,
    WorkspaceModule,
  ],
  exports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
  ],
})
export class ModulesModule {}