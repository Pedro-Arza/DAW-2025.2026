import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private baseUrl: string = 'https://peticiones.online/api/users';
  httpCliente = inject(HttpClient);

  constructor() {}
//metodo para obtener todos los usuarios
  getAllUsuarios(): Observable<Iusuario[]> {
    return this.httpCliente.get<Iusuario[]>(this.baseUrl);
  }

  getAllUsuariosWithPromise(): Promise<Iusuario[]> {
    return lastValueFrom(this.httpCliente.get<Iusuario[]>(`${this.baseUrl}`));
  }

  getUsuariosById(_id: number): Promise<Iusuario> {
    return lastValueFrom(this.httpCliente.get<Iusuario>(`${this.baseUrl}/${_id}`));
  }
//Metodo para eliminar usuario
  deleteUsuarioById(_id: number): Promise<any> {
    return lastValueFrom(this.httpCliente.delete<any>(`${this.baseUrl}/${_id}`));
  }

//Metodo para crear usuario
  createUsuario(usuario: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpCliente.post<Iusuario>(`${this.baseUrl}`, usuario));
  }

//Metodo para actualizar usuario
  updateUsuarioById(_id: number, usuario: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpCliente.put<Iusuario>(`${this.baseUrl}/${_id}`, usuario));
  }

}
