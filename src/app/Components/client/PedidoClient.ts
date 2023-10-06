import axios, { AxiosInstance } from "axios";
import { PedidoModel } from "../model/PedidoModel";

class PedidoClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8081/api/pedido',
      headers: { 'Content-type': 'application/json' }
    });
  }

  public async findById(id: number): Promise<PedidoModel> {
    try {
      return (await this.axiosClient.get<PedidoModel>(`/lista/id/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async listaAllAtivo(): Promise<any> {
    try {
      return (await this.axiosClient.get<PedidoModel[]>(`/lista/ativo/true`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async listaAll(): Promise<any> {
    try {
      return (await this.axiosClient.get<PedidoModel[]>(`/lista`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async listarPedidosDoCliente(id: number): Promise<PedidoModel[]> {
    try {
      return (await this.axiosClient.get<PedidoModel[]>(`/lista/cliente/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async cadastrarComposto(cadastro: PedidoModel): Promise<PedidoModel> {
    try {
      return (await this.axiosClient.post<PedidoModel>(`/cadastrar/composto`, cadastro)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async cadastroSimples(cadastro: PedidoModel): Promise<PedidoModel> {
    try {
      return (await this.axiosClient.post<PedidoModel>(`/cadastrar/simples`, cadastro)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async cadastroDiario(cadastro: PedidoModel): Promise<string> {
    try {
      return (await this.axiosClient.post<string>(`/cadastrar/diario`, cadastro)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async editar(id: number, editar: PedidoModel): Promise<string> {
    try {
      return (await this.axiosClient.put<string>(`/${id}`, editar)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  
    public async excluir(id: number): Promise<string> {
    try {
      return (await this.axiosClient.delete<string>(`/delete/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  
}

export default new PedidoClient();
