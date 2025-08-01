import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestGroupRepository } from '../request-group/request-group.repository';

@Injectable()
export class RequestGroupOwnerGuard implements CanActivate {
  constructor(
    private readonly requestGroupRepository: RequestGroupRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;
    const requestGroupId = request.params.id;

    if (!userId || !requestGroupId) {
      throw new UnauthorizedException();
    }

    const isOwner = await this.requestGroupRepository.isOwner(
      requestGroupId,
      userId,
    );

    if (!isOwner) {
      throw new UnauthorizedException(
        'You do not have permission to access this resource.',
      );
    }

    return true;
  }
}
