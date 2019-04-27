@Injectable({
  providedIn: 'root',
})
export class JobService {

  configUrl = 'http://localhost:8090/api/v1/folders/jobs/Functional-tests/Tempest';
  jobs: object;

  getConfig() {
    console.log('Coucou: getConfig start');
    return this.http.get(this.configUrl);
  }

  showConfig() {
    console.log('Coucou: showConfig start');
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
