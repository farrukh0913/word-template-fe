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
    console.log('dataa', data);
    this.data = data;
    console.log('incoming data', this.data);
  }
  getData(): any {
    return this.data;
  }
}
