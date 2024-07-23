// logging.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environments'; 

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(private http: HttpClient) {}

  log(message: string) {
    this.http.post('/api/logs', { message }).subscribe();
  }
}
