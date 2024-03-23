import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatoService {
  constructor(private paginato: MatPaginatorIntl) {}

  dutchRangeLabel(page: number, pageSize: number, length: number) {
    if (length == 0 || pageSize == 0) {
      return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

  getPaginatorIntl() {
    this.paginato.itemsPerPageLabel = 'Items por página';
    this.paginato.nextPageLabel = 'Página siguiente ';
    this.paginato.previousPageLabel = 'Página anterior';
    this.paginato.firstPageLabel = 'Primera página';
    this.paginato.lastPageLabel = 'Última página';
    this.paginato.getRangeLabel = this.dutchRangeLabel;
  }
}
