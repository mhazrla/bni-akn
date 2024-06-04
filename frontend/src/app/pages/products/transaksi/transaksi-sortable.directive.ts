import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Transaksi } from '../../../core/models/master-admin.model';
export type SortColumn = keyof Transaksi | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface transaksiSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[transaksisortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdTransaksiSortableHeader {
  @Input() transaksisortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() pemesanansort = new EventEmitter<transaksiSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.pemesanansort.emit({
      column: this.transaksisortable,
      direction: this.direction,
    });
  }
}
