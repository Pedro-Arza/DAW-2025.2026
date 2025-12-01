import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Componente Home: Es la página de inicio (la portada)
@Component({
  selector: 'app-home',
  imports: [RouterLink], // Importamos RouterLink para el botón de "Ver Libros"
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
