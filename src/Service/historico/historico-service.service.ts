import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bancos } from 'm';
@Injectable({
  providedIn: 'root'
})
export class HistoricoServiceService {
  private baseUrl = 'http://localhost:8081/api/historico'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(historico: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, historico);
  }

  atualizar(id: number, historico: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, historico);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}