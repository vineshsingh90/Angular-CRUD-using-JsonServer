import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    TableModule,
    CardModule,
    DropdownModule,
    ToastModule,
    MessageModule,
    InputTextModule,
    ConfirmDialogModule,
    PanelModule,
  ],
})
export class PrimengModule {}
