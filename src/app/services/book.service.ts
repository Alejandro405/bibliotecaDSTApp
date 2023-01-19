import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Book } from "../entities/Book";
import { environment } from "src/enviroments/enviroment";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiServerUrl = environment.apiBaseUrl.concat("/book");

    constructor(private http: HttpClient) {}

    public getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiServerUrl}/all`);
    }

    public addBook(book: Book | undefined): Observable<Book> {
        return this.http.post<Book>(`${this.apiServerUrl}/add`, book);
    }

    public updateEmployee(book: Book | undefined): Observable<Book> {
        return this.http.put<Book>(`${this.apiServerUrl}/update`, book);
    }

    public deleteEmployee(bookId: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delete/${bookId}`);
    }
}