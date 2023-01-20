import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/entities/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  //title = 'bibliotecaDSTApp';
  public books: Book[] = [];

  public editBook: Book | undefined;
  public deleteBook: Book | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  /**
   * name
   */
  public getBooks():void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form')!.click();
    this.bookService.addBook(addForm.value).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateBook(employee: Book): void {
    this.bookService.updateEmployee(employee).subscribe(
      (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBook(employeeId: number | undefined): void {
    this.bookService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    console.log(key);
    const results: Book[] = [];
    for (const employee of this.books) {
      if (employee.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.summary.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.books = results;
    if (results.length === 0 || !key) {
      this.getBooks();
    }
  }

  public onOpenModal(book: Book | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === 'edit') {
      this.editBook = book;
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBook = book;
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
