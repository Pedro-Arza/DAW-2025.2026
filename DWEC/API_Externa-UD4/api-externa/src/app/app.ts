import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";
import { Navbar } from "./components/navbar/navbar";
import { UsuarioCard } from './components/usuario-card/usuario-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, UsuarioCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('api-externa');
}
