import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent, MainViewComponent } from '.';
import { CustomErrorHandler, ErrorHandlerService, RedirectorContollerService, RedirectorService, URLDefiner, URLDefinerService } from '../shared';

const routes: Routes = [
  {
    path: "", component: MainViewComponent,
    children: [
      // { path: "", component: ApartmentsComponent },
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
    RouterModule.forRoot(routes),
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
