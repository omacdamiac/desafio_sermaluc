import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DetailComponent],
  exports: [DetailComponent],
  imports: [CommonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
})
export class DetailModule {}
