import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RightAuthPanelComponent } from './components/right-auth-panel/right-auth-panel.component';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { AnnonceCardComponent } from './components/annonce-card/annonce-card.component';
import { MediaCardComponent } from './components/media-card/media-card.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    RightAuthPanelComponent,
    ControlErrorComponent,
    AnnonceCardComponent,
    MediaCardComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IconComponent,
  ],
  exports: [
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RightAuthPanelComponent,
    CommonModule,
    ControlErrorComponent,
    AnnonceCardComponent,
    MediaCardComponent,
    IconComponent,
  ],
})
export class SharedModule {}
