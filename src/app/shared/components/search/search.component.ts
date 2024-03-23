import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LIBRARY } from '@shared/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formSearch!: FormGroup;

  constructor(private router: Router, public location: Location) {}

  ngOnInit(): void {
    this.buildForm();
  }
  get form() {
    return this.formSearch.value;
  }

  buildForm() {
    this.formSearch = new FormGroup({
      buscador: new FormControl(LIBRARY.ZERO),
    });
  }

  applyFilter(e?: any) {
    console.log(e.target.value);
    console.log(this.form.buscador);
    
    let ruta = this.router.routerState.snapshot.url.replace(LIBRARY.SLASH, LIBRARY.ZERO);
    console.log(this.form.buscador);
    if (this.form.buscador != LIBRARY.ZERO) {
      console.log(ruta);
      if (ruta === LIBRARY.ROUTE_HOME) {
        this.router.navigate([LIBRARY.SLASH + LIBRARY.ROUTE_CATALOGO], { state: this.form.buscador });
      }
      if (ruta === LIBRARY.ROUTE_CATALOGO) {
        this.router
          .navigateByUrl(LIBRARY.SLASH + LIBRARY.ROUTE_HOME, { skipLocationChange: true })
          .then(() => {
            this.router.navigate([LIBRARY.SLASH + LIBRARY.ROUTE_CATALOGO], { state: this.form.buscador });
            // this.router.navigate([decodeURI(this.location.path())]);
          });
      }
    }
  }
}
