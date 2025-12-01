import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

// Este es el componente PRINCIPAL de toda la aplicación
// Es como el "contenedor maestro" que envuelve todo lo demás
@Component({
  selector: 'app-root', // El nombre que usamos en el HTML para llamar a este componente
  imports: [RouterOutlet, Navbar, Footer], // Importamos los componentes que vamos a usar
  templateUrl: './app.html', // Archivo HTML de este componente
  styleUrl: './app.css' // Archivo CSS de este componente
})
export class App {
  // Variable que guarda el nombre del proyecto
  title = 'biblioteca-examen';
}
