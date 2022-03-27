import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('Request...');
    // console.log(req.headers);
    if (req.headers.authorization === 'Bearer wool') {
      next();
    } else {
      // error: 401
      throw new UnauthorizedException(`sjkk`);
    }
  }
}
