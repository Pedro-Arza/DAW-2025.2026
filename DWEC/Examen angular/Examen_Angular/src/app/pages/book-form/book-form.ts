import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit {
  // Objeto libro vacío para rellenar con el formulario
  book: Book = {
    id: 0,
    title: '',
    author: '',
    year: new Date().getFullYear(), // Año actual por defecto
    image: '',
    description: ''
  };
  
  // Bandera para saber si estamos EDITANDO (true) o CREANDO (false)
  isEditMode: boolean = false;

  constructor(
    private bookService: BookService, // Para guardar/leer datos
    private route: ActivatedRoute,    // Para leer la URL (el ID del libro)
    private router: Router            // Para navegar a otra página (redirigir)
  ) {}

  ngOnInit(): void {
    // Intentamos obtener el parámetro 'id' de la URL (ej: /libros/5 -> id es 5)
    const id = this.route.snapshot.paramMap.get('id');
    
    // Si existe un ID, significa que estamos EDITANDO
    if (id) {
      // Pedimos al servicio el libro con ese ID
      // El + convierte el string '5' en número 5
      const existingBook = this.bookService.getBook(+id);
      
      if (existingBook) {
        // Si el libro existe, copiamos sus datos al formulario
        // Usamos { ...existingBook } para crear una COPIA y no modificar el original directamente todavía
        this.book = { ...existingBook }; 
        this.isEditMode = true; // Activamos modo edición
      } else {
        // Si el ID no existe, volvemos a la lista
        this.router.navigate(['/libros']);
      }
    }
  }

  // Función que se ejecuta al enviar el formulario (botón Guardar/Crear)
  onSubmit(): void {
    if (this.isEditMode) {
      // Si estamos editando, llamamos a actualizar
      this.bookService.updateBook(this.book);
    } else {
      // Si es nuevo, llamamos a añadir
      this.bookService.addBook(this.book);
    }
    // Al terminar, nos vamos a la página de lista de libros
    this.router.navigate(['/libros']);
  }
}
