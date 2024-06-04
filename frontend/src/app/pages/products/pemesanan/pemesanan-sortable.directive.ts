import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Pemesanan } from '../../../core/models/master-admin.model';
export type SortColumn = keyof Pemesanan | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface pemesananSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[pemesanansortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdPemesananSortableHeader {
  @Input() pemesanansortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() pemesanansort = new EventEmitter<pemesananSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.pemesanansort.emit({
      column: this.pemesanansortable,
      direction: this.direction,
    });
  }
}
