import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersediaanComponent } from './persediaan/persediaan.component';
import { PemesananComponent } from './pemesanan/pemesanan.component';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { PencatatanComponent } from './pencatatan/pencatatan.component';

const routes: Routes = [
  {
    path: 'persediaan',
    component: PersediaanComponent,
  },
  {
    path: 'pemesanan',
    component: PemesananComponent,
  },
  {
    path: 'transaksi',
    component: TransaksiComponent,
  },
  {
    path: 'pencatatan',
    component: PencatatanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
