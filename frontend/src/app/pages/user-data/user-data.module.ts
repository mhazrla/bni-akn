import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserDataRoutingModule } from './user-data-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbdUserSortableHeader } from './user/user-sortable.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UserComponent, NgbdUserSortableHeader],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgSelectModule,
    FlatpickrModule,
    SharedModule,
    SimplebarAngularModule,
    Ng2SearchPipeModule,
    UserDataRoutingModule,
  ],
  providers: [DatePipe],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserDataModule {}
