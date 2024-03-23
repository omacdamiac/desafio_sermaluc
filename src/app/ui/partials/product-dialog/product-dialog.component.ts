import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LIBRARY } from '@shared/constants';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent implements OnInit {
  categories: string[] = [];
  formProduct!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data.item);

    this.buildForm();
  }
  get form() {
    return this.formProduct.value;
  }
  private buildForm() {
    this.formProduct = new FormGroup({
      title: new FormControl(
        this.data.item ? this.data.item.title : LIBRARY.ZERO,
        Validators.required
      ),
      description: new FormControl(
        this.data.item ? this.data.item.description : LIBRARY.ZERO,
        Validators.required
      ),
      image: new FormControl(
        this.data.item ? this.data.item.image : LIBRARY.ZERO,
        Validators.required
      ),
      price: new FormControl(
        this.data.item ? this.data.item.price : LIBRARY.ZERO,
        Validators.required
      ),
      category: new FormControl(
        this.data.item ? this.data.item.category : LIBRARY.ZERO,
        Validators.required
      ),
    });
  }
  save() {
    if (this.formProduct.valid) {
      if (this.data.item.id) {
        let datos = { ...this.form, ...{ id: this.data.item.id } };
        console.log(datos);
        this.dialogRef.close(datos);
      } else {
        this.dialogRef.close(this.form);
      }
    } else {
      this.formProduct.markAllAsTouched();
    }
  }
  close() {
    this.dialogRef.close(null);
  }
}
