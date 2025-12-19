import { Component, inject, OnInit, Input, signal, WritableSignal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { Iusuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.html',
  styleUrl: './user-view.css'
})
export class UserView implements OnInit {
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  // Input Binding: El router inyecta automáticamente el parametro 'id' aquí
  @Input() id!: string; // Recibe el ID de la URL

  // Signal para el usuario
  usuario: WritableSignal<Iusuario | undefined> = signal(undefined);

  ngOnInit() {
    if (this.id) {
      this.loadUser(this.id);
    } else {
        console.warn('No ID provided via Input Binding');
    }
  }

  loadUser(id: string | number) {
      this.usuarioService.getUsuariosById(id).then((data: any) => {
             this.usuario.set(data);
      }).catch(error => {
          console.error('Error al obtener usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar la información del usuario.',
            icon: 'error',
            confirmButtonText: 'Volver'
          }).then(() => {
            this.router.navigate(['/users']);
          });
      });
  }
}
