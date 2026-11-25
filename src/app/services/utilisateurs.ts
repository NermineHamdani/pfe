import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = 'http://localhost:8084/api/users'; // Ajuste le port si nécessaire

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }
}