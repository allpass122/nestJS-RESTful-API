import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public name: string;

  @Matches(/^[^ \f\n\r\t\v]+@[^ \f\n\r\t\v]+$/)
  public email: string;
}
