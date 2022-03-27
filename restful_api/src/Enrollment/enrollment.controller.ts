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
import { UserService } from 'src/User/user.service';
import { CreateEnrollDto } from './createEnroll.dto';
import { EnrollmentService } from './enrollment.service';
import { queryEnrollDto } from './queryEnroll.dto';

@Controller('/enroll')
export class EnrollmentController {
  constructor(
    private readonly enrollService: EnrollmentService,
    private readonly userService: UserService,
  ) {}

  // requirements 7
  @Post()
  createEnroll(@Body() createEnroll: CreateEnrollDto) {
    return this.enrollService.createEnroll(createEnroll, this.userService);
  }

  // requirements 6
  @Get('/course/:id/user')
  getUserByCourseId(@Param('id') id: number): any {
    // console.log(`6`);
    return this.enrollService.getUserByCourseId(id, this.userService);
  }

  // requirements 11
  @Get('/course/:id')
  getCourseByCourseId(@Param('id') id: number): any {
    // console.log(`11`);
    return this.enrollService.getCourseByCourseId(id);
  }

  // requirements 9
  @Get(':id')
  getEnrollById(@Param('id') id: number): any {
    return this.enrollService.getEnrollById(id);
  }

  // requirements 10
  @Get()
  queryEnroll(@Query() query: queryEnrollDto) {
    return this.enrollService.queryEnroll(query);
  }

  // requirements 12
  @Get('/user/:id/course')
  getCourseByUserId(@Param('id') id: number): any {
    return this.enrollService.getCourseByUserId(id, this.userService);
  }

  // requirements 8
  @Delete(':id')
  enrollDelete(@Param('id') id: number) {
    return this.enrollService.enrollDelete(id);
  }
}
