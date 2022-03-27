import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { QueryByNameOrEmailDto } from './queryByNameOrEmail.dto';
import { UserService } from './user.service';

@Controller('/api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // requirements 1
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    // console.log(`createUser`);
    return this.userService.createUser(createUser);
  }

  // requirements 2
  @Get(':id')
  getUserById(@Param('id') id: number): string {
    return this.userService.getUserById(id);
  }

  // requirements 3
  @Get()
  queryByNameOrEmail(@Query() query: QueryByNameOrEmailDto) {
    // console.log(`query`);
    return this.userService.queryByNameOrEmail(query);
  }

  // requirements 4
  @Put(':id')
  userEdit(@Param('id') id: number, @Body() update: CreateUserDto) {
    return this.userService.userEdit(id, update);
  }

  // requirements 5
  @Delete(':id')
  userDelete(@Param('id') id: number) {
    return this.userService.userDelete(id);
  }
}
