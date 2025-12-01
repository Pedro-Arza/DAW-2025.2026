import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from 'interfaces/book.ts';
import { Book } from '../interfaces/book.ts';

// Componente Dashboard: Panel de control con estadísticas de la biblioteca
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink], // CommonModule para *ngFor, RouterLink para navegación
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  // Array con todos los libros
  books: Book[] = [];
  
  // Estadísticas calculadas
  totalBooks: number = 0;           // Total de libros en la biblioteca
  oldestBook: Book | null = null;   // Libro más antiguo
  newestBook: Book | null = null;   // Libro más reciente
  authorsCount: number = 0;         // Número de autores únicos
  recentBooks: Book[] = [];         // Últimos 5 libros añadidos

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Al cargar el componente, calculamos todas las estadísticas
    this.loadStatistics();
  }

  // Función que calcula todas las estadísticas del dashboard
  loadStatistics(): void {
    // Obtenemos todos los libros del servicio
    this.books = this.bookService.getBooks();
    
    // Total de libros es simplemente la longitud del array
    this.totalBooks = this.books.length;
    
    // Si hay libros, calculamos las estadísticas
    if (this.books.length > 0) {
      // Libro más antiguo: usamos reduce para encontrar el de menor año
      // reduce recorre el array y va guardando el libro con menor año
      this.oldestBook = this.books.reduce((oldest, book) => 
        book.year < oldest.year ? book : oldest
      );
      
      // Libro más reciente: igual pero buscamos el de mayor año
      this.newestBook = this.books.reduce((newest, book) => 
        book.year > newest.year ? book : newest
      );
      
      // Autores únicos: 
      // 1. Creamos un Set con los nombres de autores (Set elimina duplicados automáticamente)
      // 2. Contamos cuántos elementos tiene el Set
      const uniqueAuthors = new Set(this.books.map(book => book.author));
      this.authorsCount = uniqueAuthors.size;
      
      // Últimos 5 libros: ordenamos por ID descendente y tomamos los primeros 5
      // slice(0, 5) crea una copia del array con solo los primeros 5 elementos
      // sort() ordena el array. (a, b) => b.id - a.id ordena de mayor a menor
      this.recentBooks = [...this.books]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);
    }
  }
}
