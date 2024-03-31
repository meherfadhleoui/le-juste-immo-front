import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule, FormsModule, ReactiveFormsModule],
  exports: [PrimengModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
