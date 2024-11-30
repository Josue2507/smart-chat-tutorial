import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CohereaiService {

  constructor(private http: HttpClient) {}

  sendQuestion(prompt: string){
    return this.http.post(environment.baseUrl, { prompt});
  }
}


