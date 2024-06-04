import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Persediaan } from 'src/app/core/models/master-admin.model';
export type SortColumn = keyof Persediaan | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface persediaanSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[persediaansortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdPersediaanSortableHeader {
  @Input() persediaansortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() persediaansort = new EventEmitter<persediaanSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.persediaansort.emit({
      column: this.persediaansortable,
      direction: this.direction,
    });
  }
}
