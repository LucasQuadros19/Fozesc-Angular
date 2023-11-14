import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoModel } from 'src/app/model/PedidoModel';
@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {
  private baseUrl = 'http://localhost:8081/api/pedido'; 

  constructor(private http: HttpClient) { }

  listar(): Observable<PedidoModel[]> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get<any[]>(url);
  }

  getPorId(id: number): Observable<PedidoModel> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<any>(url);
  }

  adicionar(pedido: any): Observable<any> {
    const url = `${this.baseUrl}/cadastrar`;
    return this.http.post(url, pedido);
  }

  atualizar(id: number, pedido: any): Observable<any> {
    const url = `${this.baseUrl}/put/${id}`;
    return this.http.put(url, pedido);
  }

  excluir(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }
}