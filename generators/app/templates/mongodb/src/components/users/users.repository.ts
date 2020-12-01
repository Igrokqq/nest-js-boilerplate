import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { UserEntity } from './schemas/users.schema';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

import usersConstants from './users-constants';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectModel(usersConstants.models.users) private usersModel: Model<UserEntity>,
  ) {}

  public create(user: CreateUserDto): Promise<UserEntity> {
    return this.usersModel.create({
      ...user,
      verified: false,
    });
  }

  public getById(id: ObjectID, verified: boolean = true): Promise<UserEntity | null> {
    return this.usersModel.findOne({
      _id: id,
      verified,
    }).exec();
  }

  public updateById(id: ObjectID, data: UpdateUserDto): Promise<UserEntity> {
    return this.usersModel.updateOne(
      {
        _id: id,
      },
      {
        $set: data,
      },
    ).exec();
  }

  public getAll(verified: boolean): Promise<UserEntity[] | []> {
    return this.usersModel.find({
      verified,
    }).exec();
  }
}
