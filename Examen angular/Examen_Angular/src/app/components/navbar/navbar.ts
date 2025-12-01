import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Componente Navbar: Es la barra de navegación superior
@Component({
  selector: 'app-navbar',
  // Importamos RouterLink para poder navegar entre páginas sin recargar
  // RouterLinkActive sirve para resaltar el enlace de la página actual
  imports: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [RouterLink, RouterLinkActive],
})
export class Navbar {}
