import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogueComponent } from '@views/pages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }


  onActivate(component: any) {
    //     let ruta = this.router.routerState.snapshot.url.replace('/', '');
    // if (ruta === 'home') {
    //   // this.onActivate( Component, this.form.buscador)
    // }
    // console.log(component)
    // component.applyFilter(text);
    // component.anyFunction();
 }

  // applyFilter(event: any) {
  //   event.preventDefault();
  //   let ruta = this.router.routerState.snapshot.url.replace('/', '');
  //   if (ruta === 'catalogo') {
  //     // this.onActivate( Component, this.form.buscador)
  //   }
  //   console.log(ruta);
  //   this.router.navigate(['/catalogo'], { state: {} });
  //   // console.log(this.form);
  // }
}
