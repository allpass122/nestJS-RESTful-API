import { BadRequestException, Injectable, Param } from '@nestjs/common';
// import { getUserById } from '../User/user.controller';
interface Enroll {
  id: number;
  userId: number;
  courseId: number;
  role: 'student' | 'teacher';
}
interface Course {
  readonly id: number;
  readonly name: string;
}

@Injectable()
export class EnrollmentService {
  enrolls: Enroll[] = [];
  courses: Course[] = [
    {
      id: 1,
      name: 'Nestjs 101',
    },
    {
      id: 2,
      name: '成為 Nestjs 大師的路上',
    },
    {
      id: 3,
      name: '從零開始的 nestjs 之旅',
    },
    {
      id: 4,
      name: "You Don't Know Js",
    },
    {
      id: 5,
      name: "I Don't Know Js yet",
    },
  ];

  // requirements 7
  createEnroll(createEnroll, userService): any {
    // check course exist
    if (
      this.courses.find((u) => u.id === Number(createEnroll.courseId)) ===
      undefined
    ) {
      throw new BadRequestException(`Course not found`);
    }
    // check user exist
    if (
      userService.users.find((u) => u.id === createEnroll.userId) === undefined
    ) {
      throw new BadRequestException(`User not found`);
    }
    if (
      this.enrolls
        .filter((u) => u.userId === Number(createEnroll.userId))
        .find((u) => u.courseId === Number(createEnroll.courseId)) !== undefined
    ) {
      throw new BadRequestException(`This user has enrolled this course`);
    }
    const newEnroll: Enroll = {
      id: Date.now(),
      userId: createEnroll.userId,
      courseId: createEnroll.courseId,
      role: createEnroll.role,
    };
    this.enrolls.push(newEnroll);
    return newEnroll;
  }

  // requirements 6
  getUserByCourseId(id: number, userService): any {
    if (this.courses.find((u) => u.id === Number(id)) !== undefined) {
      return this.enrolls
        .filter((u) => u.courseId === Number(id))
        .map((t) => userService.getUserById(t.userId));
    } else {
      throw new BadRequestException(`Course not found`);
    }
  }

  // requirements 11
  getCourseByCourseId(id): any {
    if (this.courses.find((u) => u.id === Number(id)) !== undefined) {
      return this.courses.filter((u) => u.id === Number(id));
    } else {
      throw new BadRequestException(`Course not found`);
    }
  }

  // requirements 9
  getEnrollById(id: number): any {
    if (Number(id) === -1) {
      return this.enrolls;
    } else {
      const res = this.enrolls.find((u) => u.id === Number(id));
      if (res === undefined) {
        throw new BadRequestException(`Enroll not found`);
      } else {
        return res;
      }
    }
  }

  // requirements 8
  enrollDelete(id): any {
    if (this.enrolls.length === 0) {
      throw new BadRequestException(`Enroll not found`);
    }
    if (this.enrolls.find((u) => u.id === Number(id)) !== undefined) {
      const tmp = this.enrolls.find((u) => u.id === Number(id));
      this.enrolls.splice(
        this.enrolls.findIndex((u) => u.id === Number(id)),
        1,
      );
      return tmp;
    } else {
      throw new BadRequestException(`Enroll not found`);
    }
  }

  // requirements 10
  queryEnroll(query): any {
    let queryResult = this.enrolls;
    if (query.userId) {
      queryResult = queryResult.filter(
        (u) => u.userId === Number(query.userId),
      );
    }
    if (query.courseId) {
      queryResult = queryResult.filter(
        (u) => u.courseId === Number(query.courseId),
      );
    }
    if (query.role) {
      queryResult = queryResult.filter((u) => u.role === query.role);
    }
    return queryResult;
  }

  // requirements 12
  getCourseByUserId(id, userService): any {
    // check user exist
    if (userService.users.find((u) => u.id === Number(id)) === undefined) {
      throw new BadRequestException(`User not found`);
    }
    const res = this.enrolls
      .filter((u) => u.userId === Number(id))
      .map((t) => t.courseId);
    return this.courses.filter((u) => res.includes(u.id));
  }
}
