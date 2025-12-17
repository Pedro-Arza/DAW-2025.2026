import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private cd = inject(ChangeDetectorRef);

  usuario: Iusuario | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        console.log('UserView ID from route:', id);
        if (id) {
            this.loadUser(id);
        } else {
            console.warn('No ID found in route');
        }
    });
  }

  loadUser(id: string | number) {
      this.usuarioService.getUsuariosById(id).then((data: any) => {
             console.log('Datos del usuario recibidos:', data);
             this.usuario = data;
             this.cd.detectChanges(); // Forzar actualización de la vista
      }).catch(error => {
          console.error('Error al obtener usuario:', error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cargar la información del usuario.',
            icon: 'error',
            confirmButtonText: 'Volver'
          }).then(() => {
            this.router.navigate(['/']);
          });
      });
  }
}
