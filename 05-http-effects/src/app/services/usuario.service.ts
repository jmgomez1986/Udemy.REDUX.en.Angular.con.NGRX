import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const endpoint = `${this.url}/users?per_page=6`;
    return this.http.get<any>(endpoint);
  }

  getUserById(id: number): Observable<any> {
    const endpoint = `${this.url}/users/${id}`;
    return this.http.get<any>(endpoint);
  }
}
