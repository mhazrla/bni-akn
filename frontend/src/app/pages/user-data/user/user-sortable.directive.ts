import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { UserRole } from 'src/app/core/models/master-admin.model';
export type SortColumn = keyof UserRole | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export interface userSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[usersortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdUserSortableHeader {
  @Input() usersortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() rolessort = new EventEmitter<userSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.rolessort.emit({
      column: this.usersortable,
      direction: this.direction,
    });
  }
}
