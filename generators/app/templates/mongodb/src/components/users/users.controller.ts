import { Types } from 'mongoose';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import SuccessResponse from '@responses/success.response';
import { UserEntity } from '@components/users/schemas/users.schema';
import NotFoundResponse from '@responses/not-found.response';
import AppUtils from '@components/app/app.utils';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import UsersService from './users.service';

@ApiTags('Users')
@UseInterceptors(WrapResponseInterceptor)
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(UserEntity),
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
    description: '404. NotFoundException. User was not found',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async getById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<SuccessResponse | never> {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return new SuccessResponse(null, foundUser);
  }

  @ApiOkResponse({
    description: '200. Success. Returns all users',
    type: AppUtils.DtoFactory.wrap([UserEntity]),
  })
  @Get()
  async getAllVerifiedUsers(): Promise<SuccessResponse | []> {
    const foundUsers = await this.usersService.getAll(true);

    return new SuccessResponse(null, foundUsers);
  }
}