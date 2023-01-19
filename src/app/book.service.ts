import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Book } from "./Book";
import { environment } from "src/enviroments/enviroment";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiServerUrl}/book/all`);
    }

    public addBook(book: Book | undefined): Observable<Book> {
        return this.http.post<Book>(`${this.apiServerUrl}/book/add`, book);
    }

    public updateEmployee(book: Book | undefined): Observable<Book> {
        return this.http.put<Book>(`${this.apiServerUrl}/book/update`, book);
    }

    public deleteEmployee(bookId: number | undefined): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`);
    }
}