import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Myhttp implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq: HttpRequest<any> = req.clone({
      headers: req.headers.set('Authorization','Bearer ' +'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY1MDYxMzE3MywiZXhwIjoxNjUyNzYwNjU3fQ.c4acV5QLQzuKK0IVjsRpM2JIo6BMBSEEQdGtqaLk3mICK_Mdo5qDzpuWJQIZCbrnmUMHnmtLQ6hlnSylLzJWLg').set('X-TENANT-ID', 'fe_0122a')
    });
    return next.handle(authReq);
  }
}
