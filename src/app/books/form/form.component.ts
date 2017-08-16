import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  formType: 'NEW' | 'EDIT';
  submitBtnTxt: 'Create' | 'Update';

  constructor( 
    private formBuilder: FormBuilder,
    // ใช้ data ในการส่งข้อมูลจาก url สมมติ url นี้เรียกจาก component เดียวกัน แต่เราจะเปลี่ยนปุ่ม create หรือ update
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
   ) { }

  ngOnInit() {
    this.setFormType();
    this.createForm();
    this.loadBook();
    this.setSubmitBtnTxt();
  }

  onSubmit(event) {
    event.preventDefault();

    this.formType === 'NEW' ? this.createBook() : this.updateBook();

  }

  private createBook() {
    this.bookService.createBook(this.form.value);
    this.router.navigate(['/books']);
  }

  private updateBook() {
    const { id } = this.route.snapshot.params;
    this.bookService.updateBook(+id, this.form.value);
    this.router.navigate(['/books', id]);
  }

  private loadBook() {
    if(this.formType === 'NEW') return;

    const { id } = this.route.snapshot.params;
    const { title, description, content } = this.bookService.getBook(+id);

    this.form.setValue({ title, description, content });
  }

  private setFormType() {
    this.formType = this.route.snapshot.data.formType;
  }

  private setSubmitBtnTxt() {

    this.submitBtnTxt = this.formType === 'NEW'? 'Create' : 'Update';
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

}
