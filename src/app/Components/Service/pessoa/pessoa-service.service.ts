import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaServiceService {
  private baseUrl = 'http://localhost:8081/api/pessoa'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(Pessoa: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, Pessoa);
  }

  atualizar(id: number, Pessoa: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, Pessoa);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}