import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPagamento } from 'src/app/model/FormaPagamento';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {
  private baseUrl = 'http://localhost:8081/api/FormaPagamento'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<FormaPagamento[]> {
    const url = `${this.baseUrl}/lista`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(FormaPagamento: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, FormaPagamento);
  }

  atualizar(id: number, FormaPagamento: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, FormaPagamento);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}