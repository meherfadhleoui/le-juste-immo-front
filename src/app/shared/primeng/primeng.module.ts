import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';

@NgModule({
  exports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    ToggleButtonModule,
    InputNumberModule,
    PasswordModule,
  ],
})
export class PrimengModule {}
