import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoricoModel } from 'src/app/model/HistoricoModel';
@Injectable({
  providedIn: 'root'
})
export class HistoricoServiceService {
  private baseUrl = 'http://localhost:8081/api/historico'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<HistoricoModel[]> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<HistoricoModel> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(HistoricoModel: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, HistoricoModel);
  }

  atualizar(id: number, HistoricoModel: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, HistoricoModel);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}