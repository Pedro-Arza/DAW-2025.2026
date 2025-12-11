import { Component, inject, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Iusuario } from '../../interfaces/iusuario';
import { UsuarioService } from '../../services/usuario-service';
@Component({
  selector: 'app-usuario-card',
  imports: [],
  templateUrl: './usuario-card.html',
  styleUrl: './usuario-card.css',
})
export class UsuarioCard  {

  router = inject(Router);
  @Input() usuario!: Iusuario;
  usuarioService = inject(UsuarioService);
  

  async deleteUsuario(usuario: Iusuario) {
Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })

        const response = await this.usuarioService.deleteUsuarioById(usuario.id);

        if (response._id) {
            alert("Se ha eliminado correctamente el usuario: " + usuario.first_name);
        } else {
            alert("NO se ha eliminado correctamente el usuario: " + usuario.first_name);
        } 
    }

editUsuario(usuario: Iusuario) {

this.router.navigate(['/usuario/edit', usuario.id]);

}


seeDetails(usuario: Iusuario) {
this.router.navigate(['/usuario', usuario.id]);
}


}
