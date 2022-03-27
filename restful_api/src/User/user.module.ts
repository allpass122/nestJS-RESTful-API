import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppMiddleware } from 'src/app.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes(
        { path: '/api', method: RequestMethod.POST },
        { path: '/api/*', method: RequestMethod.PUT },
        { path: '/api/*', method: RequestMethod.DELETE },
      );
  }
}
