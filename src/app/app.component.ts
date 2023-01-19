import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './Book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bibliotecaDSTApp';
  public books: Book[] = [];

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
  
}
