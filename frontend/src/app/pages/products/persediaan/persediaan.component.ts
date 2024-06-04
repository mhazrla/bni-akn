import { Component, QueryList, ViewChildren } from '@angular/core';
import { PersediaanService } from './persediaan.service';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persediaan } from 'src/app/core/models/master-admin.model';
import { Observable } from 'rxjs';
import {
  NgbdPersediaanSortableHeader,
  persediaanSortEvent,
} from './persediaan-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { ngxCsv } from 'ngx-csv';
import { RestApiPersediaanDataService } from 'src/app/core/services/rest-api-persediaan-data.service';

@Component({
  selector: 'app-persediaan',
  templateUrl: './persediaan.component.html',
  styleUrls: ['./persediaan.component.scss'],
  providers: [PersediaanService, DecimalPipe],
})
export class PersediaanComponent {
  // userLogged
  userLogged: any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isEditMode: boolean = false;

  // Form
  persediaanForm!: FormGroup;
  submitted = false;
  rolesData!: Persediaan[];
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  econtent?: any;
  stocks?: any;
  products?: any;
  roles?: any;

  // Table data
  Leads!: Observable<Persediaan[]>;
  total: Observable<number>;
  @ViewChildren(NgbdPersediaanSortableHeader)
  headers!: QueryList<NgbdPersediaanSortableHeader>;

  constructor(
    private modalService: NgbModal,
    public service: PersediaanService,
    private formBuilder: FormBuilder,
    private apiService: RestApiPersediaanDataService,
    private alertService: AlertService
  ) {
    this.Leads = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'stocks' },
      { label: 'User', active: true },
    ];

    // User Logged
    let current: any = localStorage.getItem('currentUser')
      ? localStorage.getItem('currentUser')
      : '';
    this.userLogged = JSON.parse(current);

    /**
     * Form Validation
     */
    this.persediaanForm = this.formBuilder.group({
      id: '',
      product_id: ['', [Validators.required]],
      satuan: ['', [Validators.required]],
      jumlah: ['', [Validators.required, Validators.min(1)]],
      harga: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
    });

    /**
     * fetches data
     */

    this.Leads.subscribe((x) => {
      this.stocks = Object.assign([], x);
    });

    document.getElementById('elmLoader')?.classList.add('d-none');
    this.getProducts();
  }

  /**
   * Get All Products
   */
  getProducts() {
    this.apiService.getAllProducts().subscribe((data) => {
      this.products = data.data;
    });
  }

  /**
   * Delete Model Open
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Edit mode
   */
  enableEditMode() {
    this.isEditMode = true;
    this.persediaanForm.get('nama_barang')?.disable();
  }

  disableEditMode() {
    this.isEditMode = false;
    this.persediaanForm.get('nama_barang')?.enable();
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.apiService.deletePersediaan(id).subscribe({
        next: (data) => {
          this.service.datas = this.service.datas.filter(
            (persediaan: any) => persediaan.id !== id
          );
          document.getElementById('r_' + id)?.remove();
          this.alertService.success('Persediaan has been deleted');
        },
        error: (err) => {
          this.content = JSON.parse(err.error).message;
        },
      });
    } else {
      console.log(`ID ${id} tidak ditemukan`);
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
  }

  /**
   * Form data get
   */
  get form() {
    return this.persediaanForm.controls;
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Persediaan';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = 'Update';

    this.apiService.getSingleStock(id).subscribe({
      next: (result) => {
        this.econtent = result.data;

        this.persediaanForm.controls['product_id'].setValue(
          this.econtent[0].product_id
        );
        this.persediaanForm.controls['id'].setValue(this.econtent[0].id);
        this.persediaanForm.controls['satuan'].setValue(
          this.econtent[0].satuan
        );
        this.persediaanForm.controls['harga'].setValue(this.econtent[0].harga);
        this.persediaanForm.controls['vendor'].setValue(
          this.econtent[0].vendor
        );
      },
      error: (err) => {
        this.content = JSON.parse(err.error).message;
      },
    });
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  cancelEdit() {
    this.persediaanForm.reset();
    this.econtent = [];
    this.submitted = false;
    this.modalService.dismissAll();
  }

  /**
   * Save persediaan
   */
  savePersediaan() {
    if (this.persediaanForm.valid) {
      const formData = { ...this.persediaanForm.value };
      delete formData.id;
      const existingStock = this.service.datas.find((persediaan: any) => {
        return persediaan.id === this.persediaanForm.value.id;
      });

      if (existingStock) {
        this.apiService
          .putPersediaan(this.persediaanForm.value)
          .subscribe((res: any) => {
            console.log('res', res);
            // Update existing role data in the local array
            const updatedStockIndex = this.service.datas.findIndex(
              (stock: any) => {
                return stock.id === res.data[0].id;
              }
            );
            if (updatedStockIndex !== -1) {
              this.service.datas[updatedStockIndex] = res.data[0];
            }

            this.submitted = true;
            this.persediaanForm.reset();
            this.modalService.dismissAll();
            this.alertService.success('Persediaan barang telah diubah');
          });
      } else {
        this.apiService
          .postPersediaan(this.persediaanForm.value)
          .subscribe((data: any) => {
            this.service.datas.push(data.data[0]);
            this.submitted = true;
            this.persediaanForm.reset();
            this.modalService.dismissAll();
            this.alertService.success('Barang telah ditambahkan ke persediaan');
          });
      }
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: persediaanSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.persediaansortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onProductSelected(product_id: any) {
    const selectedProduct = this.products.find((product: any) => {
      return product.id === product_id;
    });
    if (selectedProduct) {
      this.persediaanForm.patchValue({
        satuan: selectedProduct.satuan,
        jumlah: selectedProduct.jumlah,
        harga: selectedProduct.harga,
        vendor: selectedProduct.vendor,
      });
    }
  }
}
