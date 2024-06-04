import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Pencatatan } from 'src/app/core/models/master-admin.model';
export type SortColumn = keyof Pencatatan | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface pencatatanSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[pencatatansortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdPencatatanSortableHeader {
  @Input() pencatatansortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() pencacatansort = new EventEmitter<pencatatanSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.pencacatansort.emit({
      column: this.pencatatansortable,
      direction: this.direction,
    });
  }
}
