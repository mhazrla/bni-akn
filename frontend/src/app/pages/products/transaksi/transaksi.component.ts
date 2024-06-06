import { Component, QueryList, ViewChildren } from '@angular/core';
import { TransaksiService } from './transaksi.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaksi } from 'src/app/core/models/master-admin.model';
import { Observable } from 'rxjs';
import {
  NgbdTransaksiSortableHeader,
  transaksiSortEvent,
} from './transaksi-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { ngxCsv } from 'ngx-csv';
import { RestApiTransactionDataService } from 'src/app/core/services/rest-api-transaksi-data.service ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.scss'],
  providers: [TransaksiService, DecimalPipe, CurrencyPipe],
})
export class TransaksiComponent {
  // userLogged
  userLogged: any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isEditMode: boolean = false;

  // Form
  transaksiForm!: FormGroup;
  verifiedForm!: FormGroup;
  submitted = false;
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  econtent?: any;
  requests?: any;
  pdfFiles: File[] = [];

  // Table data
  Leads!: Observable<Transaksi[]>;
  total: Observable<number>;
  @ViewChildren(NgbdTransaksiSortableHeader)
  headers!: QueryList<NgbdTransaksiSortableHeader>;

  constructor(
    private modalService: NgbModal,
    public service: TransaksiService,
    private formBuilder: FormBuilder,
    private apiService: RestApiTransactionDataService,
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
      { label: 'transactions' },
      { label: 'Transaksi', active: true },
    ];

    // User Logged
    let current: any = localStorage.getItem('currentUser')
      ? localStorage.getItem('currentUser')
      : '';
    this.userLogged = JSON.parse(current);

    /**
     * Form Validation
     */
    this.transaksiForm = this.formBuilder.group({
      id: '',
      nama_vendor: ['', [Validators.required]],
      invoice_path: ['', [Validators.required]],
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
    });

  }

  /**
   * Get All Products
   */

  /**
   * Delete Model Open
   */
  verifiedId: any;
  confirm(content: any, id: any) {
    this.verifiedId = id;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Edit mode
   */
  enableEditMode() {
    this.isEditMode = true;
    this.transaksiForm.get('nama_barang')?.disable();
  }

  disableEditMode() {
    this.isEditMode = false;
    this.transaksiForm.get('nama_barang')?.enable();
  }

  // Delete Data
  verifiedData(id: any) {
    if (id) {
      this.apiService.verifiedTransaction(id).subscribe({
        next: (data) => {
          this.alertService.success('Transaksi telah diverifikasi');
          this.router.navigate(['/products/transaksi']);
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
    return this.transaksiForm.controls;
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
    modelTitle.innerHTML = 'Edit Transaksi';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = 'Update';

    this.apiService.getSingleTransaction(id).subscribe({
      next: (result) => {
        this.econtent = result.data;
        this.transaksiForm.controls['invoice_path'].patchValue(
          this.econtent[0].invoice_path
        );
        this.transaksiForm.controls['id'].patchValue(this.econtent[0].id);
        this.transaksiForm.controls['nama_vendor'].patchValue(
          this.econtent[0].nama_vendor
        );
        this.transaksiForm.controls['tanggal'].patchValue(
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
    this.transaksiForm.reset();
    this.econtent = [];
    this.submitted = false;
    this.modalService.dismissAll();
  }

  readPDF(event: Event) {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;

    if (files && files.length > 0) {
      this.pdfFiles = Array.from(files);
    }
  }

  /**
   * Save transaksi
   */
  saveTransaksi() {
    if (this.transaksiForm.valid) {
      const nama_vendor = this.transaksiForm.get('nama_vendor')?.value;
      const tanggal = this.transaksiForm.get('tanggal')?.value;
      const id = this.transaksiForm.get('id')?.value;

      const formData = new FormData();

      this.pdfFiles.forEach((file) => {
        formData.append('pdfFiles', file, file.name);
      });

      formData.append('nama_vendor', nama_vendor);
      formData.append('tanggal', tanggal);

      const existingRequest = this.service.datas.find((transaksi: any) => {
        return transaksi.id === id;
      });

      if (existingRequest) {
        this.apiService.putTransaction(formData).subscribe((res: any) => {
          const updatedRequestIndex = this.service.datas.findIndex(
            (request: any) => {
              console.log(request);
              return request.id === res.data[0].id;
            }
          );
          if (updatedRequestIndex !== -1) {
            this.service.datas[updatedRequestIndex] = res.data[0];
          }

          this.submitted = true;
          this.transaksiForm.reset();
          this.modalService.dismissAll();
          this.alertService.success('Transaksi barang telah diubah');
        });
      } else {
        this.apiService.postTransaction(formData).subscribe((data: any) => {
          // Logika setelah permintaan POST berhasil
          this.service.datas.push(data.data[0]);
          this.submitted = true;
          this.transaksiForm.reset();
          this.modalService.dismissAll();
          this.alertService.success('Data transaksi berhasil ditambahkan');
        });
      }
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: transaksiSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.transaksisortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
