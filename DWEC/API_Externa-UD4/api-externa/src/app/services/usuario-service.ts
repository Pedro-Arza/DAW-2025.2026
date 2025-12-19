import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private baseUrl: string = 'https://peticiones.online/api/users';
  httpCliente = inject(HttpClient);
  
  // Cache para simular persistencia (ya que la API es fake)
  private usuariosCache: any = null;
  // Lista local para usuarios creados (que no se guardan en el servidor real)
  private localUsers: Iusuario[] = [];

  constructor() {}
//metodo para obtener todos los usuarios
  getAllUsuarios(page: number = 1, perPage: number = 10): Observable<any> {
    return this.httpCliente.get<any>(`${this.baseUrl}?page=${page}&per_page=${perPage}`).pipe(
      map(data => {
        if (page === 1) {
          // Prepend local users to the first page results
          data.results = [...this.localUsers, ...data.results];
        }
        this.usuariosCache = data;
        return data;
      })
    );
  }

  getAllUsuariosWithPromise(): Promise<Iusuario[]> {
    return lastValueFrom(this.httpCliente.get<Iusuario[]>(`${this.baseUrl}`));
  }

  getUsuariosById(_id: string | number): Promise<Iusuario> {
    // Buscar primero en localUsers
    const localUser = this.localUsers.find((u: any) => u._id === _id || u.id == _id);
    if (localUser) return Promise.resolve(localUser);

    // Intentar buscar en cache primero si existe
    if (this.usuariosCache && this.usuariosCache.results) {
        const cachedUser = this.usuariosCache.results.find((u: any) => u._id === _id || u.id == _id);
        if (cachedUser) {
            return Promise.resolve(cachedUser);
        }
    }
    return lastValueFrom(this.httpCliente.get<Iusuario>(`${this.baseUrl}/${_id}`));
  }
//Metodo para eliminar usuario
  deleteUsuarioById(_id: string | number): Promise<any> {
    return lastValueFrom(this.httpCliente.delete<any>(`${this.baseUrl}/${_id}`))
      .then(res => {
          // Eliminar de localUsers si existe
          this.localUsers = this.localUsers.filter((u: any) => u._id !== _id && u.id != _id);
          
          if (this.usuariosCache && this.usuariosCache.results) {
              this.usuariosCache.results = this.usuariosCache.results.filter((u: any) => u._id !== _id && u.id != _id);
          }
          return res;
      });
  }

//Metodo para crear usuario
  createUsuario(usuario: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpCliente.post<Iusuario>(`${this.baseUrl}`, usuario))
      .then(res => {
          // Guardamos en localUsers con el ID simulado que venga (o uno generado si la API fake no devuelve uno unico)
          const newUser = { ...usuario, ...res, _id: res._id || res.id || Date.now() }; 
          this.localUsers.unshift(newUser); // Add to beginning of local list
          return res;
      });
  }

//Metodo para actualizar usuario
  updateUsuarioById(_id: string | number, usuario: Iusuario): Promise<Iusuario> {
    return lastValueFrom(this.httpCliente.put<Iusuario>(`${this.baseUrl}/${_id}`, usuario))
      .then(res => {
          // Actualizamos el cache con los nuevos datos
          if (this.usuariosCache && this.usuariosCache.results) {
             const index = this.usuariosCache.results.findIndex((u: any) => u._id === _id || u.id == _id);
             if (index !== -1) {
                 // Mezclamos lo que había con lo nuevo
                 this.usuariosCache.results[index] = { ...this.usuariosCache.results[index], ...usuario, ...res };
             }
          }
          return res;
      });
  }

}
