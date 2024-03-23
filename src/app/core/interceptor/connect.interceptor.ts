import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { LoaderService } from "@shared/components/loader/commons/service/loader.service";
import { LIBRARY } from "@shared/constants";

@Injectable()
export class ConnectInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}
  private _activeRequest = 0;
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this._activeRequest === 0) {
      this.loaderService.showLoader();
    }
    this._activeRequest++;
    let req = request.clone({
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMsg = LIBRARY.ZERO;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.message}`;
          console.log(errorMsg);
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          console.log(errorMsg);
        }
        return throwError(errorMsg);
      }),
      finalize(() => this._stopLoading())
    );
  }

  private _stopLoading() {
    this._activeRequest--;
    if (this._activeRequest === 0) {
      this.loaderService.closeLoader();
    }
  }
}
