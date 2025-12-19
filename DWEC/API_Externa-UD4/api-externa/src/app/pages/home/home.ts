import { Component, inject, OnInit, NgZone, signal, WritableSignal } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Iusuario } from '../../interfaces/iusuario';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  ngZone = inject(NgZone);
  
  // Usamos signals para el estado, que es lo último de Angular
  usuarios: WritableSignal<Iusuario[]> = signal([]);
  page: WritableSignal<number> = signal(1);
  totalPages: WritableSignal<number> = signal(1);
  totalUsers: WritableSignal<number> = signal(0);
  perPage: WritableSignal<number> = signal(10);

  ngOnInit() {
    this.loadUsers(this.page());
  }

  loadUsers(page: number) {
    this.usuarioService.getAllUsuarios(page, 8).subscribe((data: any) => {
      this.usuarios.set(data.results);
      this.page.set(data.page);
      this.totalPages.set(data.total_pages);
      this.perPage.set(data.per_page);
      this.totalUsers.set(data.total);
    });
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.loadUsers(newPage);
    }
  }

  verDetalles(_id: string | number) {
    this.router.navigate(['/usuario', _id]);
  }

  actualizarUsuario(_id: string | number) {
    this.router.navigate(['/usuario/edit', _id]);
  }

  borrarUsuario(_id: string | number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngZone.run(() => {
          const backupUsuarios = [...this.usuarios()];

          // Actualización optimista con signals
          this.usuarios.update(users => users.filter((u) => u._id !== _id));

          Swal.fire({
            title: '¡Borrado!',
            text: 'El usuario ha sido eliminado correctamente.',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
          });

          this.usuarioService.deleteUsuarioById(_id).catch((err) => {
            console.error('Error al borrar en API, revirtiendo cambios', err);
            // Revertimos cambios si falla
            this.usuarios.set(backupUsuarios);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema real en el servidor. El usuario ha sido restaurado.',
              icon: 'error',
            });
          });
        });
      }
    });
  }
}
