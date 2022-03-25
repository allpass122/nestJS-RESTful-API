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

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    // requirements 1
    // console.log(`createUser`);
    return this.userService.createUser(createUser);
  }

  @Get(':id')
  getUserById(@Param('id') id: number): string {
    // requirements 2
    return this.userService.getUserById(id);
  }

  @Get()
  queryByNameOrEmail(@Query() query: QueryByNameOrEmailDto) {
    // requirements 3
    console.log(`query`);
    return this.userService.queryByNameOrEmail(query);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() update: CreateUserDto) {
    // requirements 4
    return this.userService.userEdit(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // requirements 5
    return this.userService.userDelete(id);
  }
}
