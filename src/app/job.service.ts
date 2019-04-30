@Injectable({
  providedIn: 'root',
})
export class JobService {

    jobs: object;

  getConfig() {
    console.log('getConfig start');
    return this.http.get('/api/folders/jobs/Functional-tests/Rally');
  }

  showConfig() {
    console.log('showConfig start');
    this.getConfig()
      .subscribe((data) => console.log(data));
  }

  constructor(private http: HttpClient) {
    console.log(this.showConfig());
  }
}
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';


import {Observable} from 'rxjs';
