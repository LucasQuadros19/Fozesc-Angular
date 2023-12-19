import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bancos } from 'src/app/model/Bancos';
import { Mensagem } from 'src/app/model/Mensagem';
@Injectable({
  providedIn: 'root'
})
export class BancoserviceService {
  private baseUrl = 'http://localhost:8081/api/banco'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<Bancos[]> {
    const url = `${this.baseUrl}/lista`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<Bancos> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(banco: any): Observable<Mensagem> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post<Mensagem>(url, banco);
  }

  atualizar(id: number, banco: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, banco);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}