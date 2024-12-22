import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan, IResponse, HistoryResponse } from 'src/app/shared/models';
import { environment as env } from 'environments/environment';
import { Faq } from 'src/app/shared/models/faq';
import { Generation } from 'src/app/shared/models/generation';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  generate(file: File, id: string): Observable<IResponse<Generation>> {
    const data = new FormData();
    data.append('image', file);
    data.append('id', id);

    return this.http.post<IResponse<Generation>>(
      `${env.webApi}/${env.api.image}/${env.api.generate}`,
      data,
    );
  }

  getPayLink(plan_id: number, user_id: number): Observable<IResponse<void>> {
    return this.http.post<IResponse<void>>(
      `${env.webApi}/${env.api.plans}/${env.api.purchase}`,
      { plan_id, user_id },
    );
  }

  getPlans(): Observable<IResponse<Plan[]>> {
    return this.http.get<IResponse<Plan[]>>(`${env.webApi}/${env.api.plans}`);
  }

  getFaq(): Observable<IResponse<Faq[]>> {
    return this.http.get<IResponse<Faq[]>>(`${env.webApi}/${env.api.faq}`);
  }

  getUser(id: string): Observable<IResponse<{ credits: number }>> {
    const params = new HttpParams({
      fromObject: {
        id,
      },
    });

    return this.http.get<IResponse<{ credits: number }>>(
      `${env.webApi}/${env.api.profile}`,
      { params },
    );
  }

  getHistory(id: string, page: number): Observable<IResponse<HistoryResponse>> {
    const params = new HttpParams({
      fromObject: {
        id,
        page,
      },
    });

    return this.http.get<IResponse<HistoryResponse>>(
      `${env.webApi}/${env.api.payments}/${env.api.history}`,
      { params },
    );
  }

  downLoadImage(
    id: number,
    format: 'jpg' | 'png',
  ): Observable<IResponse<{ file_base64: string }>> {
    return this.http.get<IResponse<{ file_base64: string }>>(
      `${env.webApi}/${env.api.image}/${id}/${env.api.download}/${format}`,
    );
  }
}
