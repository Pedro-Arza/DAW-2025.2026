import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import Swal from 'sweetalert2';
import { Iusuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    image: new FormControl('https://i.pravatar.cc/500') 
  });

  isEditMode = false;
  userId: string | number | null = null;
  currentUser: Iusuario | null = null; // Store the full user object
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = id;
        this.loadUserData(this.userId!);
      }
    });
  }

  loadUserData(id: string | number) {
    this.usuarioService.getUsuariosById(id).then((data: any) => {
      this.currentUser = data; // Guardamos el usuario completo
      this.userForm.patchValue({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        image: data.image
      });
    }).catch(error => {
      Swal.fire('Error', 'No se pudo cargar la información del usuario', 'error');
      this.router.navigate(['/']);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      
      let usuario: any;

      if (this.isEditMode && this.currentUser) {
        // En modo edición, mezclamos los datos originales con los del formulario
        // para NO perder el ID numérico ni el _id si son diferentes
        usuario = {
            ...this.currentUser,
            ...formValue
        };
        
        // Usamos el _id del usuario cargado (o el que tengamos en userId) para la petición
        // La API de peticiones.online usa el _id (Mongo) en la URL, pero espera el objeto completo en el body
        const idForUrl = this.currentUser._id || this.userId;

        this.usuarioService.updateUsuarioById(idForUrl!, usuario).then(() => {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El usuario ha sido actualizado correctamente.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
             this.router.navigate(['/']);
          });
        }).catch(err => {
            console.error(err);
            Swal.fire('Error', 'Hubo un problema al actualizar el usuario.', 'error');
        });
      } else {
        // En modo creación
        usuario = {
            ...formValue
            // id: ... (la API generará uno, o podemos omitirlo)
        };

        this.usuarioService.createUsuario(usuario).then(() => {
            Swal.fire({
              title: '¡Creado!',
              text: 'El usuario ha sido creado correctamente.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
               this.router.navigate(['/']);
            });
        }).catch(err => {
            console.error(err);
            Swal.fire('Error', 'Hubo un problema al crear el usuario.', 'error');
        });
      }
    } else {
        Swal.fire('Atención', 'Por favor completa el formulario correctamente', 'warning');
    }
  }
}
