import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Remplace 8080 par le port de ton Spring Boot si nécessaire
  private apiUrl = 'http://localhost:8084/api/auth/login'; 

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}