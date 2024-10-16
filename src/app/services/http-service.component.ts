import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {  
  constructor(private httpClient: HttpClient) {}

  /**
   * get method
   * @param url api url
   * @returns observable
   */
  getRequest(url: string): Observable<any> {
    return this.httpClient.get(url)
  }

  /**
   * get method by id
   * @param url api url
   * @returns observable
   */
  getByIdRequest(url: string): Observable<any> {
    return this.httpClient.get(url)
  }

  /**
   * post method
   * @param url api url
   * @param payload payload as object
   * @returns observable
   */
  postRequest(url: string, payload: any): Observable<any> {
    return this.httpClient.post(url, payload)
  }

  /**
   * put method
   * @param url api url
   * @param payload payload as object
   * @returns observable
   */
  updateRequest(url: string, payload: any): Observable<any> {
    return this.httpClient.put(url, payload)
  }

  /**
   * delete method
   * @param url api url
   * @param payload any payload
   * @returns observable
   */
  deleteRequest(url: string): Observable<any> {
    return this.httpClient.delete(url);
  }

  // // Get a template by name
  // getTemplate(templateName: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${templateName}`);
  // }
}
