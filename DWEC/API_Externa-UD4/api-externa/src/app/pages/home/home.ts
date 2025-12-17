import { Component, inject, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
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
  cd = inject(ChangeDetectorRef); // Inyectar ChangeDetectorRef
  usuarios: Iusuario[] = [];

  ngOnInit() {
    this.usuarioService.getAllUsuarios().subscribe((data: any) => {
       // Asegurar que forzamos la actualización al cargar también
      this.usuarios = data.results;
      this.cd.detectChanges();
    });
  }

  verDetalles(_id: string | number) {
    this.router.navigate(['/usuario', _id]);
  }

  actualizarUsuario(_id: string | number) {
     this.router.navigate(['/usuario/edit', _id]);
  }

  borrarUsuario(_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngZone.run(() => {
            const backupUsuarios = [...this.usuarios];
            
            this.usuarios = [...this.usuarios.filter(u => u._id !== _id)];
            
            // Forzamos la detección
            this.cd.markForCheck(); // O usar detectChanges()
            this.cd.detectChanges();
            
            Swal.fire({
              title: "¡Borrado!",
              text: "El usuario ha sido eliminado correctamente.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false
            });

            this.usuarioService.deleteUsuarioById(_id).catch(err => {
              console.error('Error al borrar en API, revirtiendo cambios', err);
              this.usuarios = backupUsuarios;
              this.cd.detectChanges(); 
              Swal.fire({
                title: "Error",
                text: "Hubo un problema real en el servidor. El usuario ha sido restaurado.",
                icon: "error"
              });
            });
        });
      }
    });
  }
}
