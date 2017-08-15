import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './books/shared/book.service';
import { BookListComponent } from './books/book-list/book-list.component'

const appRoutes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/book',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
