import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) {}

  get(endPoint: string) {
    return this.http.get(this.baseUrl + endPoint);
  }
  post(endPoint: string, payload: any) {
    return this.http.post(this.baseUrl + endPoint, payload);
  }
  put(endPoint: string, payload: any) {
    return this.http.put(this.baseUrl + endPoint, payload);
  }
  delete(endPoint: string) {
    return this.http.delete(this.baseUrl + endPoint);
  }
}
