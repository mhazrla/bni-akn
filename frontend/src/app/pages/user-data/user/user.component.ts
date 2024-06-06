import { Component, QueryList, ViewChildren } from '@angular/core';
import { UserService } from './user.service';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from 'src/app/core/models/master-admin.model';
import { Observable } from 'rxjs';
import {
  NgbdUserSortableHeader,
  userSortEvent,
} from './user-sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/core/services/alert.service';
import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv';
import { RestApiUserDataService } from 'src/app/core/services/rest-api-user-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, DecimalPipe],
})
export class UserComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isEditMode: boolean = false;

  // Form
  userForm!: FormGroup;
  submitted = false;
  rolesData!: UserRole[];
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  econtent?: any;
  users?: any;
  permissions?: any;
  roles?: any;

  // Table data
  Leads!: Observable<UserRole[]>;
  total: Observable<number>;
  @ViewChildren(NgbdUserSortableHeader)
  headers!: QueryList<NgbdUserSortableHeader>;

  constructor(
    private modalService: NgbModal,
    public service: UserService,
    private formBuilder: FormBuilder,
    private apiService: RestApiUserDataService,
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
      { label: 'users' },
      { label: 'User', active: true },
    ];

    /**
     * Form Validation
     */
    this.userForm = this.formBuilder.group({
      role_id: '',
      role_name: ['', [Validators.required]],
      permission_id: ['', [Validators.required]],
    });

    /**
     * fetches data
     */

    this.Leads.subscribe((x) => {
      this.users = Object.assign([], x);
    });

    this.getUsers();
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
    this.userForm.get('role_name')?.disable();
  }

  disableEditMode() {
    this.isEditMode = false;
    this.userForm.get('role_name')?.enable();
  }

  /**
   * Multiple Delete
   */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var result;
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    if (checkedVal.length > 0) {
      this.modalService.open(content, { centered: true });
    } else {
      Swal.fire({
        text: 'Please select at least one checkbox',
        confirmButtonColor: '#239eba',
      });
    }
    this.checkedValGet = checkedVal;
  }

  // Delete Data
  deleteData(role_id: any) {
    if (role_id) {
      this.apiService.deleteUser(role_id).subscribe({
        next: (data) => {
          this.service.datas = this.service.datas.filter(
            (role: any) => role.role_id !== role_id
          );
          document.getElementById('r_' + role_id)?.remove();
          this.alertService.success('Role has been deleted');
        },
        error: (err) => {
          this.content = JSON.parse(err.error).message;
        },
      });
    } else {
      this.checkedValGet.forEach((item: any) => {
        document.getElementById('r_' + item)?.remove();
      });
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
    return this.userForm.controls;
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(role_id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Role';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = 'Update';

    this.apiService.getSingleUser(role_id).subscribe({
      next: (data) => {
        const users = JSON.parse(data);
        this.econtent = users.data;

        this.userForm.controls['role_name'].patchValue(
          this.econtent[0].role_name
        );

        this.userForm.controls['role_id'].patchValue(this.econtent[0].role_id);

        this.userForm.controls['permission_id'].patchValue(
          this.econtent[0].permission
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
    this.userForm.reset();
    this.econtent = [];
    this.submitted = false;
    this.modalService.dismissAll();
  }

  /**
   * Save role
   */
  saveUser() {
    if (this.userForm.valid) {
      const roleName = this.userForm.value.role_name;

      const roleNameRegex = /^[a-zA-Z0-9\- ]*$/; // Pola yang mengizinkan huruf, angka, spasi, dan tanda minus
      const isRoleNameValid = roleNameRegex.test(roleName);

      if (!isRoleNameValid) {
        this.alertService.error(
          'Invalid role name. Role name can only contain letters, numbers, hyphens (-), and spaces.'
        );
        return;
      }

      const formData = { ...this.userForm.value };
      delete formData.role_id;
      const existingRole = this.service.datas.find((role: any) => {
        return role.role_id === this.userForm.value.role_id;
      });

      this.userForm.value.permission_id = this.userForm.value.permission_id.map(
        (permission: any) => permission.id
      );

      if (existingRole) {
        this.apiService.putUser(this.userForm.value).subscribe((res: any) => {
          // Update existing role data in the local array
          const updatedRoleIndex = this.service.datas.findIndex(
            (role: any) => role.role_id === res.data[0].role_id
          );
          if (updatedRoleIndex !== -1) {
            this.service.datas[updatedRoleIndex] = res.data[0];
          }

          this.submitted = true;
          this.userForm.reset();
          this.modalService.dismissAll();
          this.alertService.success('Role has been edited');
        });
      } else {
        const roleName = this.userForm.value.role_name;

        const isRoleExist = this.service.datas.some((role: any) => {
          return (
            role.role_name.trim().toLowerCase() ===
            roleName.trim().toLowerCase()
          );
        });

        if (!isRoleExist) {
          this.apiService
            .postUser(this.userForm.value)
            .subscribe((data: any) => {
              this.service.datas.push(data.data[0]);
              this.submitted = true;
              this.userForm.reset();
              this.modalService.dismissAll();
              this.alertService.success('Role has been added');
            });
        } else {
          this.alertService.error('Role already exists');
        }
      }
    }
  }


  /**
   * Get All Roles
   */
  getUsers() {
    this.apiService.getAllUsers().subscribe((data) => {
      this.roles = data.data;
    });
  }

  // Csv File Export
  csvFileExport() {
    var orders = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Order Data',
      useBom: true,
      noDownload: false,
      headers: [
        'id',
        'Role Id',
        'customer',
        'product',
        'orderDate',
        'amount',
        'payment',
        'status',
      ],
    };
    new ngxCsv(this.content, 'orders', orders);
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: userSortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.usersortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
