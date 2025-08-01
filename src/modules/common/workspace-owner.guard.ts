import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { WorkspaceRepository } from '../workspace/workspace.repository';

@Injectable()
export class WorkspaceOwnerGuard implements CanActivate {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const workspaceId = request.params.workspaceId;

    if (!userId || !workspaceId) {
      throw new UnauthorizedException();
    }

    const isOwner = await this.workspaceRepository.isOwner(workspaceId, userId);

    if (!isOwner) {
      throw new UnauthorizedException(
        'You are not the owner of this workspace.',
      );
    }

    return true;
  }
}
