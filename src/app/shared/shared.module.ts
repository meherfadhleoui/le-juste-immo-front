import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RightAuthPanelComponent } from './components/right-auth-panel/right-auth-panel.component';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { StringToObjectPipe } from './pipes/string-to-object.pipe';
import { AnnonceCardComponent } from './components/annonce-card/annonce-card.component';

@NgModule({
  declarations: [
    RightAuthPanelComponent,
    ControlErrorComponent,
    StringToObjectPipe,
    AnnonceCardComponent,
  ],
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
    ControlErrorComponent,
    StringToObjectPipe,
    AnnonceCardComponent,
  ],
})
export class SharedModule {}
