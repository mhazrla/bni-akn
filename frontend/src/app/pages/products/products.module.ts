import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NgbdPersediaanSortableHeader } from './persediaan/persediaan-sortable.directive';
import { PersediaanComponent } from './persediaan/persediaan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PemesananComponent } from './pemesanan/pemesanan.component';
import { ThousandSeparatorDirective } from './thousand-separator.directive';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { PencatatanComponent } from './pencatatan/pencatatan.component';

@NgModule({
  declarations: [PersediaanComponent, NgbdPersediaanSortableHeader, PemesananComponent, ThousandSeparatorDirective, TransaksiComponent, PencatatanComponent],
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
    ProductsRoutingModule,
  ],
  providers: [DatePipe],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsModule {}
