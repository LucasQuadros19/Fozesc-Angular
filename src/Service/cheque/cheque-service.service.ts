import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bancos } from 'src/app/model/Bancos';
@Injectable({
  providedIn: 'root'
})
export class ChequeServiceService {
  private baseUrl = 'http://localhost:8081/api/cheque'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    const url = `${this.baseUrl}/lista`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<any> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(cheque: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, cheque);
  }

  atualizar(id: number, cheque: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, cheque);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}