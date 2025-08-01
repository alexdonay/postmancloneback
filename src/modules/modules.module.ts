import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfraModule } from './infra/infra.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { RequestGroupModule } from './request-group/request-group.module';

@Module({
  imports: [UserModule, InfraModule, WorkspaceModule, RequestGroupModule],
})
export class ModulesModule {}
