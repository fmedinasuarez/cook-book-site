import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { SearchBarComponent } from './search-bar.component';
import { MainModule } from '../main/main.module';
import { AppModule } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    SearchBarComponent,
  ],
  exports:[
    SearchBarComponent
  ],
})
export class SearchBarModule { }
