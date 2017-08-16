import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookService
   ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit(event) {
    event.preventDefault();

    this.bookService.createBook(this.form.value);
    this.router.navigate(['/books']);
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

}
