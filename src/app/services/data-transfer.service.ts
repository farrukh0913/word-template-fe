import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  data: any;  
  constructor() { 
  }

  setData(data: any) {
    this.data = data;
  }
  getData(): any {
    return this.data;
  }
}
