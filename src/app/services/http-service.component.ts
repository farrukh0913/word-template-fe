import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HttpRequestService {
  constructor(private httpClient: HttpClient) {}
  readonly localUrl: string = 'http://localhost:3000/api/';
  readonly baseUrl: string = 'https://gps-be.vercel.app/api/';

  /**
   * get method
   * @param endpoint api endpoint
   * @returns observable
   */
  getRequest(endpoint: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + endpoint)
  }

  /**
   * get method by id
   * @param endpoint api endpoint
   * @returns observable
   */
  getByIdRequest(endpoint: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + endpoint)
  }

  /**
   * post method
   * @param endpoint api endpoint
   * @param payload payload as object
   * @returns observable
   */
  postRequest(endpoint: string, payload: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + endpoint, payload)
  }

  /**
   * put method
   * @param endpoint api endpoint
   * @param payload payload as object
   * @returns observable
   */
  updateRequest(endpoint: string, payload: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + endpoint, payload)
  }

  /**
   * delete method
   * @param endpoint api endpoint
   * @param payload any payload
   * @returns observable
   */
  deleteRequest(endpoint: string): Observable<any> {
    return this.httpClient.delete(this.baseUrl + endpoint);
  }

  // // Get a template by name
  // getTemplate(templateName: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${templateName}`);
  // }
}
