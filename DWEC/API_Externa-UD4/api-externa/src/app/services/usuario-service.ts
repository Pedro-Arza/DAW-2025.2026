import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Iusuario } from '../interfaces/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private baseUrl: string = 'https://peticiones.online/api/users';
  httpCliente = inject(HttpClient);
  
  // Cache para simular persistencia (ya que la API es fake)
  private usuariosCache: any = null;

  constructor() {}
//metodo para obtener todos los usuarios
  getAllUsuarios(): Observable<any> {
    if (this.usuariosCache) {
      return of(this.usuariosCache);
    }
    return this.httpCliente.get<any>(this.baseUrl).pipe(
      tap(data => this.usuariosCache = data)
    );
  }

  getAllUsuariosWithPromise(): Promise<Iusuario[]> {
    return lastValueFrom(this.httpCliente.get<Iusuario[]>(`${this.baseUrl}`));
  }

  getUsuariosById(_id: string | number): Promise<Iusuario> {
    // Intentar buscar en cache primero si existe, para mayor velocidad y coherencia
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
          if (this.usuariosCache && this.usuariosCache.results) {
              // Asignamos el ID que devuelve la API (si lo devuelve) o simulamos uno
              const newUser = { ...usuario, ...res };
              this.usuariosCache.results.push(newUser);
          }
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
