import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        let formatData = {};

        if (data.data) {
          formatData = plainToInstance(this.dto, data.data, { excludeExtraneousValues: true });
          return { ...data, data: formatData };
        } else {
          formatData = plainToInstance(this.dto, data, { excludeExtraneousValues: true });
          return formatData;
        }
      }),
    );
  }
}
