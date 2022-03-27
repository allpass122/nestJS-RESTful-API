import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
enum Role {
  'student',
  'teacher',
}
export class queryEnrollDto {
  @IsOptional()
  @IsNotEmpty()
  public userId: number;

  @IsOptional()
  @IsNotEmpty()
  public courseId: number;

  @IsOptional()
  @IsEnum(Role)
  public role: string;
}
