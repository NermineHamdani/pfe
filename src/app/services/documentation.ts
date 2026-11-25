import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documentation } from '../models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentationService {
  
  // Modifie le port (8080 ou 8082) selon la configuration de ton application Spring Boot
  private apiUrl = 'http://localhost:8084/api/documentations';

  constructor(private http: HttpClient) {}

  getDocs(): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(`${this.apiUrl}/all`);
  }

  saveDoc(doc: Documentation): Observable<Documentation> {
    return this.http.post<Documentation>(`${this.apiUrl}/save`, doc);
  }

  updateDoc(id: string, doc: Documentation): Observable<Documentation> {
    return this.http.put<Documentation>(`${this.apiUrl}/update/${id}`, doc);
  }

  deleteDoc(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}