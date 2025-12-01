import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BookList } from './pages/book-list/book-list';
import { BookForm } from './pages/book-form/book-form';

// Aquí definimos todas las URLs de nuestra página web
export const routes: Routes = [
  // Ruta vacía: es la página principal (localhost:4200)
  { path: '', component: Home },
  
  // Ruta /libros: muestra la lista de libros con dashboard integrado
  { path: 'libros', component: BookList },
  
  // Ruta /libros/nuevo: muestra el formulario vacío para crear
  { path: 'libros/nuevo', component: BookForm },
  
  // Ruta /libros/:id : El :id es un PARÁMETRO variable.
  // Ejemplo: /libros/1, /libros/50. Sirve para editar un libro específico.
  { path: 'libros/:id', component: BookForm },
  
  // Ruta comodín (**): Si el usuario escribe cualquier cosa rara,
  // lo mandamos de vuelta al inicio (redirectTo: '').
  { path: '**', redirectTo: '' }
];
