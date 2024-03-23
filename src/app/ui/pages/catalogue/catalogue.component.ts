import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPRODUCTS } from '@core/models';
import { ProductsService } from '@data/services';
import { LIBRARY } from '@shared/constants';
import { PaginatoService } from '@shared/utils';
import { DetailComponent, ProductDialogComponent } from '@views/partials';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  formCategories!: FormGroup;
  displayedColumns: string[] = [
    'title',
    'description',
    'category',
    'price',
    'detail',
  ];
  categories!: string[];
  dataSource!: MatTableDataSource<IPRODUCTS>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  busqueda: string;
  constructor(
    private productsService: ProductsService,
    private paginato: PaginatoService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.busqueda = this.router.getCurrentNavigation()?.extras.state as any;
  }

  ngOnInit(): void {
    this.buidlForm();
    this.allProducts();
    this.allCategories();
    this.paginato.getPaginatorIntl();
    setTimeout(() => {
      this.applyFilter(this.busqueda);
    }, 500);
  }
  buidlForm() {
    this.formCategories = new FormGroup({});
  }
  create(): void {
    console.log(screen.width);
    
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: screen.width < 768 ? '96%' : '70%',
      disableClose: true,
      data: { item: undefined, cat: this.categories },
    });

    dialogRef.afterClosed().subscribe((productDialog) => {
      if (productDialog !== null) {
        this.productsService.createProduct(productDialog).subscribe({
          next: (res) => res,
          error: (err) => this.toastr.info(err, 'Opps!'),
          complete: () => this.toastr.info('Se creo correctamente', 'Nuevo'),
        });
      }
    });
  }
  private allCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (response: string[]) => (this.categories = response),
      error: (err) => this.toastr.info(err, 'Opps!'),
    });
  }
  private allProducts() {
    this.productsService.getProducts().subscribe({
      next: (response: IPRODUCTS[]) => {
        this.dataSource = new MatTableDataSource(response);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 700);
      },
    });
  }
  edit(product: IPRODUCTS) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: screen.width < 768 ? '96%' : '70%',
      data: { item: product, cat: this.categories },
    });

    dialogRef.afterClosed().subscribe((productDialog) => {
      console.log(productDialog);

      if (productDialog !== null) {
        this.productsService.editProduct(productDialog).subscribe({
          next: (res) => res,
          error: (err) => this.toastr.info(err, 'Opps!'),
          complete: () =>
            this.toastr.info('EDición satisfactoria', 'EDitar producto'),
        });
      }
    });
  }
  view(product: IPRODUCTS): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '70%',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  delete(idProduct: number) {
    console.log(idProduct);
    this.productsService.deleteProduct(idProduct).subscribe({
      next: () => this.toastr.info('Se elimino correctamente!', 'Eliminando'),
    });
  }
  applyFilter(txt: string) {
    if (txt === LIBRARY.SPACE || txt === undefined) {
      return;
    }
    console.log(txt);

    this.dataSource.filter = txt.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
