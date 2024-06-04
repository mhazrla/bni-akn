import {
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PencatatanService } from './pencatatan.service';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pencatatan } from 'src/app/core/models/master-admin.model';
import { Observable } from 'rxjs';
import {
  NgbdPencatatanSortableHeader,
  pencatatanSortEvent,
} from './pencatatan-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import { ngxCsv } from 'ngx-csv';
import { RestApiPencatatanDataService } from 'src/app/core/services/rest-api-pencatatan-data.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pencatatan',
  templateUrl: './pencatatan.component.html',
  styleUrls: ['./pencatatan.component.scss'],
  providers: [PencatatanService, DecimalPipe],
})
export class PencatatanComponent {
  selectedProductId!: number;
  // userLogged
  userLogged: any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isEditMode: boolean = false;

  // Form
  pencatatanForm!: FormGroup;
  submitted = false;
  rolesData!: Pencatatan[];
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  econtent?: any;
  stocks?: any;
  products?: any;
  roles?: any;

  // Table data
  Leads!: Observable<Pencatatan[]>;
  total: Observable<number>;
  @ViewChildren(NgbdPencatatanSortableHeader)
  headers!: QueryList<NgbdPencatatanSortableHeader>;

  constructor(
    private modalService: NgbModal,
    public service: PencatatanService,
    private formBuilder: FormBuilder,
    private apiService: RestApiPencatatanDataService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
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
    this.pencatatanForm = this.formBuilder.group({
      id: '',
      product_id: ['', [Validators.required]],
      tanggal: ['', [Validators.required]],
      uraian: ['', [Validators.required]],
      barang_masuk: [''],
      barang_keluar: [''],
    });

    /**
     * fetches data
     */

    this.applyFilter();

    document.getElementById('elmLoader')?.classList.add('d-none');
    this.getProducts();
  }

  applyFilter() {
    if (this.selectedProductId) {
      this.stocks = this.service.datas.filter((data: any) => {
        return data.product_id == this.selectedProductId;
      });
    } else {
      this.stocks = Object.assign([], this.service.datas);
    }
  }

  exportToPdf() {
    const DATA = document.getElementById('table-to-export');

    if (DATA) {
      // Remove the Action column from the table if present
      const rows = DATA.querySelectorAll('tr');
      rows.forEach((row) => {
        const cells = row.querySelectorAll('td, th');
        cells.forEach((cell, index) => {
          if (cell.textContent === 'Action') {
            row.removeChild(cell);
          }
        });
      });

      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('angular-demo.pdf');

        // Refresh the page to restore the Action column
        window.location.reload();
      });
    }
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
    this.pencatatanForm.get('nama_barang')?.disable();
  }

  disableEditMode() {
    this.isEditMode = false;
    this.pencatatanForm.get('nama_barang')?.enable();
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.apiService.deletePencatatan(id).subscribe({
        next: (data) => {
          this.service.datas = this.service.datas.filter(
            (pencatatan: any) => pencatatan.id !== id
          );
          document.getElementById('r_' + id)?.remove();
          this.alertService.success('Pencatatan has been deleted');
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
    return this.pencatatanForm.controls;
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
    modelTitle.innerHTML = 'Edit Pencatatan';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = 'Update';

    this.apiService.getSinglePencatatan(id).subscribe({
      next: (result) => {
        this.econtent = result.data;
        this.pencatatanForm.controls['product_id'].setValue(
          this.econtent[0].product_id
        );
        this.pencatatanForm.controls['id'].setValue(this.econtent[0].id);
        this.pencatatanForm.controls['tanggal'].setValue(
          this.econtent[0].tanggal
        );
        this.pencatatanForm.controls['barang_masuk'].setValue(
          this.econtent[0].barang_masuk
        );
        this.pencatatanForm.controls['barang_keluar'].setValue(
          this.econtent[0].barang_keluar
        );
        this.pencatatanForm.controls['uraian'].setValue(
          this.econtent[0].uraian
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
    this.pencatatanForm.reset();
    this.econtent = [];
    this.submitted = false;
    this.modalService.dismissAll();
  }

  /**
   * Save pencatatan
   */
  savePencatatan() {
    if (this.pencatatanForm.valid) {
      const formData = { ...this.pencatatanForm.value };
      delete formData.id;
      const existingStock = this.service.datas.find((pencatatan: any) => {
        return pencatatan.id === this.pencatatanForm.value.id;
      });

      if (existingStock) {
        this.apiService
          .putPencatatan(this.pencatatanForm.value)
          .subscribe((res: any) => {
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
            this.pencatatanForm.reset();
            this.modalService.dismissAll();
            this.alertService.success('Pencatatan barang telah diubah');
          });
      } else {
        this.apiService
          .postPencatatan(this.pencatatanForm.value)
          .subscribe((data: any) => {
            this.service.datas.push(data.data[0]);
            this.submitted = true;
            this.pencatatanForm.reset();
            this.modalService.dismissAll();
            this.alertService.success('Barang telah ditambahkan ke pencatatan');
          });
      }
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: pencatatanSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.pencatatansortable !== column) {
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
      this.pencatatanForm.patchValue({
        tanggal: selectedProduct.tanggal,
        jumlah: selectedProduct.jumlah,
        barang_masuk: selectedProduct.barang_masuk,
        barang_keluar: selectedProduct.barang_keluar,
      });
    }
  }
}
