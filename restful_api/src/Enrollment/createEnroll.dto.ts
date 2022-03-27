import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';
enum Role {
  'student',
  'teacher',
}
export class CreateEnrollDto {
  @IsNotEmpty()
  public userId: number;

  @IsNotEmpty()
  public courseId: number;

  @IsEnum(Role)
  public role: string;
}
