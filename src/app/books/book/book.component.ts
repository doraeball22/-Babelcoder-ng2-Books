import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Book } from '../shared/book';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setBook();
  }

  private setBook() {
    const { id } = this.route.snapshot.params;
    // +id is convert string to integer
    this.book = this.bookService.getBook(+id);
  }

}
