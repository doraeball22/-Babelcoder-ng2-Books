import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
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
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.subscribeToId();
  }

  onPrev() {
    this.router.navigate(['/books', this.book.prevId]);
  }

  onNext() {
    this.router.navigate(['/books', this.book.nextId]);
  }

  private subscribeToId() {
    this.route.params.subscribe(params => this.book = this.bookService.getBook(+params.id));
  }

  // มันไม่ได้สร้างคอมโพเนนใหม่ ตอนกด next or prev ข้อมูลเลยเป็นข้อมูลเดิม
  // private setBook() {
  //   const { id } = this.route.snapshot.params;
  //   // +id is convert string to integer
  //   this.book = this.bookService.getBook(+id);
  // }

}
