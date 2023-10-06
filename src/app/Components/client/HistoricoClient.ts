import axios, { AxiosInstance } from "axios";
import { HistoricoModel } from "../model/HistoricoModel";

class HistoricoClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8081/api/historico',
      headers: { 'Content-type': 'application/json' }
    });
  }


  public async findById(id: number): Promise<HistoricoModel> {
    try {
      return (await this.axiosClient.get<HistoricoModel>(`/lista/id/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async getParcelasByOperacao(id: number): Promise<HistoricoModel[]> {
    try {
      return (await this.axiosClient.get<HistoricoModel[]>(`/lista/Parcela/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async listaAll(): Promise<any> {
    try {
      return (await this.axiosClient.get<HistoricoModel[]>(`/lista`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async cadastrar(cadastro: HistoricoModel): Promise<string> {
    try {
      return (await this.axiosClient.post<string>(`/cadastrar`, cadastro)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async editar(id: number, editar: HistoricoModel): Promise<string> {
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

export default new HistoricoClient();
