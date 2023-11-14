import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Situacao } from 'src/app/model/Situacao';
@Injectable({
  providedIn: 'root'
})
export class SituacaoServiceService {
  private baseUrl = 'http://localhost:8081/api/situacao'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<Situacao[]> {
    const url = `${this.baseUrl}/lista`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<Situacao> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(situacao: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, situacao);
  }

  atualizar(id: number, situacao: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, situacao);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}