import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppMiddleware } from 'src/app.middleware';
import { UserModule } from 'src/User/user.module';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

@Module({
  imports: [UserModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes(
        { path: '/enroll', method: RequestMethod.POST },
        { path: '/enroll/*', method: RequestMethod.DELETE },
      );
  }
}
