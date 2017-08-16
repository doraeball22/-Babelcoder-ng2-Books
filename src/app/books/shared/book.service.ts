import { Injectable } from '@angular/core';
import { Book } from './book';
import { FlashMessageService } from '../../flash-message/shared/flash-message.service';
import { MockBooks } from './mock-books';

@Injectable()
export class BookService {

  books: Book[] = MockBooks;

  constructor(private flashMessageService: FlashMessageService) { }
  
  getBooks() {
    return this.books;
  }

  getBook(id: number) {
    return this.books.find(book => book.id === id);
  }

  createBook(book: Book) {
    this.books = [
      ...this.books,
      {
        ...book, id: this.books.length + 1
      }
    ];

    this.flashMessageService.addMessage('success', 'The book has been created.');
  }

  updateBook(id: number, book: Book) {
    const index = this.books.findIndex(book => book.id === id);
    const selectedBook = this.books[index];

    this.books = [
      ...this.books.slice(0, index),
      { ...book, id},
      ...this.books.slice(index +1)
    ];

    this.flashMessageService.addMessage('success', 'The book has been updated.');
  }
}
