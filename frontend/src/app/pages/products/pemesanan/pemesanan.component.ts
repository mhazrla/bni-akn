import { Component, QueryList, ViewChildren } from '@angular/core';
import { PemesananService } from './pemesanan.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pemesanan } from 'src/app/core/models/master-admin.model';
import { Observable } from 'rxjs';
import {
  NgbdPemesananSortableHeader,
  pemesananSortEvent,
} from './pemesanan-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { RestApiPemesananDataService } from 'src/app/core/services/rest-api-pemesanan-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pemesanan',
  templateUrl: './pemesanan.component.html',
  styleUrls: ['./pemesanan.component.scss'],
  providers: [PemesananService, DecimalPipe, CurrencyPipe],
})
export class PemesananComponent {
  // userLogged
  userLogged: any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isEditMode: boolean = false;

  // Form
  pemesananForm!: FormGroup;
  verifiedForm!: FormGroup;
  submitted = false;
  rolesData!: Pemesanan[];
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  econtent?: any;
  requests?: any;
  products?: any;
  roles?: any;
  totalHarga: number = 0;
  checkboxChecked: boolean = false;

  // Table data
  Leads!: Observable<Pemesanan[]>;
  total: Observable<number>;
  @ViewChildren(NgbdPemesananSortableHeader)
  headers!: QueryList<NgbdPemesananSortableHeader>;

  constructor(
    private modalService: NgbModal,
    public service: PemesananService,
    private formBuilder: FormBuilder,
    private apiService: RestApiPemesananDataService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.Leads = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'requests' },
      { label: 'Permintaan', active: true },
    ];

    // User Logged
    let current: any = localStorage.getItem('currentUser')
      ? localStorage.getItem('currentUser')
      : '';
    this.userLogged = JSON.parse(current);

    /**
     * Form Validation
     */
    this.verifiedForm = this.formBuilder.group({
      is_verified: [false],
    });

    this.pemesananForm = this.formBuilder.group({
      id: '',
      id_product: ['', [Validators.required]],
      satuan: ['', [Validators.required]],
      jumlah: ['', [Validators.required, Validators.min(1)]],
      harga_satuan: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
      no_telp: ['', [Validators.required]],
      no_po: ['', [Validators.required]],
      contact_person: ['', [Validators.required]],
      harga_total: ['', [Validators.required]],
      tanggal: ['', [Validators.required]],
    });

    this.verifiedForm = this.formBuilder.group({
      is_verified: ['', [Validators.required]],
    });

    /**
     * fetches data
     */

    this.Leads.subscribe((x) => {
      this.requests = Object.assign([], x);
      this.calculateTotalHarga();
    });

    this.getStocks();
  }

  updateCheckbox(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checkboxChecked = target.checked;
  }

  /**
   * Get All Stocks
   */
  getStocks() {
    this.apiService.getAllStocks().subscribe((data) => {
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
    this.pemesananForm.get('id_product')?.disable();
  }

  disableEditMode() {
    this.isEditMode = false;
    this.pemesananForm.get('id_product')?.enable();
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.apiService.deleteRequest(id).subscribe({
        next: (data) => {
          this.service.datas = this.service.datas.filter(
            (pemesanan: any) => pemesanan.id !== id
          );
          document.getElementById('r_' + id)?.remove();
          this.alertService.success('Pemesanan telah dihapus');
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
    return this.pemesananForm.controls;
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
    modelTitle.innerHTML = 'Edit Pemesanan';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = 'Update';

    this.apiService.getSingleRequest(id).subscribe({
      next: (result) => {
        this.econtent = result.data;
        this.pemesananForm.controls['id_product'].patchValue(
          this.econtent[0].id_product
        );
        this.pemesananForm.controls['id'].patchValue(this.econtent[0].id);
        this.pemesananForm.controls['satuan'].patchValue(
          this.econtent[0].satuan
        );
        this.pemesananForm.controls['harga_satuan'].patchValue(
          this.econtent[0].harga_satuan
        );
        this.pemesananForm.controls['vendor'].patchValue(
          this.econtent[0].vendor_name
        );
        this.pemesananForm.controls['jumlah'].patchValue(
          this.econtent[0].jumlah
        );
        this.pemesananForm.controls['no_po'].patchValue(this.econtent[0].no_po);
        this.pemesananForm.controls['no_telp'].patchValue(
          this.econtent[0].no_telp
        );
        this.pemesananForm.controls['harga_total'].patchValue(
          this.econtent[0].harga_total
        );
        this.pemesananForm.controls['contact_person'].patchValue(
          this.econtent[0].contact_person
        );
        this.pemesananForm.controls['tanggal'].patchValue(
          this.econtent[0].tanggal
        );
      },
      error: (err: any) => {
        this.content = JSON.parse(err.error).message;
      },
    });
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  cancelEdit() {
    this.pemesananForm.reset();
    this.econtent = [];
    this.submitted = false;
    this.modalService.dismissAll();
  }

  /**
   * Save pemesanan
   */
  savePemesanan() {
    if (this.pemesananForm.valid) {
      const formData = { ...this.pemesananForm.value };
      delete formData.id;
      const existingRequest = this.service.datas.find((pemesanan: any) => {
        return pemesanan.id === this.pemesananForm.value.id;
      });

      if (existingRequest) {
        this.apiService
          .putRequest(this.pemesananForm.value)
          .subscribe((res: any) => {
            // Update existing role data in the local array
            const updatedRequestIndex = this.service.datas.findIndex(
              (request: any) => {
                return request.id === res.data[0].id;
              }
            );
            if (updatedRequestIndex !== -1) {
              this.service.datas[updatedRequestIndex] = res.data[0];
            }

            this.submitted = true;
            this.pemesananForm.reset();
            this.modalService.dismissAll();
            this.alertService.success('Pemesanan barang telah diubah');
          });
      } else {
        this.apiService
          .postRequest(this.pemesananForm.value)
          .subscribe((data: any) => {
            this.service.datas.push(data.data[0]);
            this.submitted = true;
            this.pemesananForm.reset();
            this.modalService.dismissAll();
            this.alertService.success('Barang telah ditambahkan ke pemesanan');
          });
      }
    }
  }

  verifiedRequest() {
    this.apiService.getVerified().subscribe(
      (res: any) => {
        this.alertService.success('Pemesanan telah diverifikasi');
      },
      (error) => {
        this.alertService.error('Gagal memverifikasi pemesanan');
      },
      () => {
        this.router.navigate(['/products/pemesanan']);
      }
    );
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: pemesananSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.pemesanansortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onProductSelected(id_product: any) {
    const selectedProduct = this.products.find((product: any) => {
      return product.id_product === id_product;
    });
    if (selectedProduct) {
      this.pemesananForm.patchValue({
        satuan: selectedProduct.satuan,
        harga_satuan: selectedProduct.harga,
        vendor: selectedProduct.vendor_name,
        no_telp: selectedProduct.no_telp,
      });
    }
  }

  onJumlahTyped(jumlah: any) {
    const harga_satuan = this.pemesananForm.value.harga_satuan;
    this.pemesananForm.patchValue({
      harga_total: jumlah * harga_satuan,
    });
  }

  calculateTotalHarga() {
    this.totalHarga = 0;
    if (this.requests) {
      this.requests.forEach((data: any) => {
        this.totalHarga += parseInt(data.harga_total);
      });
    }
  }
}
