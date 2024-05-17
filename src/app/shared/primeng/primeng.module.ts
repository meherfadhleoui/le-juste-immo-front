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
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageModule } from 'primeng/image';
import { PaginatorModule } from 'primeng/paginator';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    CardModule,
    DividerModule,
    TagModule,
    CheckboxModule,
    ImageModule,
    PaginatorModule,
    StepsModule,
    RadioButtonModule,
    GalleriaModule,
    InputTextareaModule,
    MessagesModule,
    CalendarModule,
    ConfirmDialogModule,
  ],
})
export class PrimengModule {}
