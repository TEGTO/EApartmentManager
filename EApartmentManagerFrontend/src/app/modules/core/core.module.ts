import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent, MainViewComponent } from '.';
import { ApartmentBoardComponent } from '../apartment';
import { ApartmentModule } from '../apartment/apartment.module';
import { CustomErrorHandler, ErrorHandlerService, RedirectorContollerService, RedirectorService, URLDefiner, URLDefinerService } from '../shared';

const routes: Routes = [
  {
    path: "", component: MainViewComponent,
    children: [
      { path: "", component: ApartmentBoardComponent },
    ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ApartmentModule,
  ],
  providers: [
    { provide: URLDefiner, useClass: URLDefinerService },
    { provide: CustomErrorHandler, useClass: ErrorHandlerService },
    { provide: RedirectorService, useClass: RedirectorContollerService },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class CoreModule { }
