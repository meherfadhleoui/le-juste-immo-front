import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RightAuthPanelComponent } from './components/right-auth-panel/right-auth-panel.component';

@NgModule({
  declarations: [RightAuthPanelComponent],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RightAuthPanelComponent,
    CommonModule,
  ],
})
export class SharedModule {}
