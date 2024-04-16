import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

@NgModule({
  exports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    ToggleButtonModule,
    InputNumberModule,
    PasswordModule,
    SelectButtonModule,
    FieldsetModule,
    DropdownModule,
    RippleModule,
    MenubarModule,
    AvatarModule,
    MenuModule,
  ],
})
export class PrimengModule {}
