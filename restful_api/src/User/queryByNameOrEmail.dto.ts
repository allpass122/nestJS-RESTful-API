import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
export class QueryByNameOrEmailDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Matches(/^[^ \f\n\r\t\v]+@[^ \f\n\r\t\v]+$/)
  email: string;
}
