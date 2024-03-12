import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import SimpleBar from 'simplebar';
import Chart from 'chart.js';
import jsVectorMap from 'jsvectormap';
import feather from 'feather-icons';
import flatpickr from 'flatpickr';
import 'jsvectormap/dist/maps/world.js';
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import EmployeesService from './employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  filterDropdownSettings: any;
  filterDropDown: any;
  selectedfilter: any;
  onSearchChange(event) {
    console.log(event.target.value);
    console.log(this.nameSearch);
    this.personDetails = this.employeesService.nameFilter(
      event.target.value,
      null
    );
  }
  filters = { name: '', status: [] };
  ngOnChanges() {}
  // Multiselect items
  projectsDropDown = [];
  selectedProjects = [];
  projectsDropdownSettings = {};
  nameSearch: string = '';
  deleteModal = null;
  addModal = null;
  newPath = null;
  isEditMode = false;
  editPersonObject = null;
  selectedPerson;
  addPersonItem(f: NgForm) {
    this.router.navigate(['add'], { relativeTo: this.route });

    // console.log(f.value);
    // console.log('I am reset');
    // this.isEditMode = false;
    // this.newPath = null;
    // f.reset();
    // this.addModal.show();
  }

  personDetails = [];

  handleFileChange(event) {
    // console.log(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);

      this.newPath = reader.result;
    };
    reader.onerror = (error) => {
      // console.log('Error: ', error);
      return '';
    };
    reader.onloadend = () => {
      console.log('DONE', reader.readyState); // readyState will be 2
    };
  }

  addPerson(f: NgForm) {
    console.log(f.valid);
    if (f.valid && !this.isEditMode) {
      // console.log(this.newPath);
      console.log(f);
      const obj = {
        name: f.value.name,
        phone: f.value.phone,
        dob: f.value.dob,
        status: f.value.status,
        projects: f.value.projects,
        imgPath: this.newPath,
      };
      this.personDetails.push(obj);
      this.addModal.hide();
      this.isEditMode = false;
      f.reset();
    } else if (f.valid && this.isEditMode) {
      console.log('I AM UPDATE');
      var index = this.personDetails.indexOf(this.editPersonObject);
      this.personDetails[index] = {
        name: f.value.name,
        phone: f.value.phone,
        dob: f.value.dob,
        projects: f.value.projects,
        status: f.value.status,
        imgPath: this.newPath,
      };
      f.reset();
      this.addModal.hide();
    }
  }

  deletePerson() {
    let index = this.personDetails.indexOf(this.selectedPerson);
    this.employeesService.deleteEmployee(index);
    this.updateEmployeeDetails();

    this.deleteModal.hide();
  }
  selectPerson(person) {
    this.selectedPerson = person;
  }
  updateEmployeeDetails() {
    this.personDetails = this.employeesService.getEmployees();
  }

  editModelRow(person, f: NgForm) {
    console.log('edit model row');
    let index = this.personDetails.indexOf(person);

    const Oldperson = {
      name: person.name,
      phone: person.phone,
      dob: person.dob,
      status: person.status,
      projects: person.projects,
      imgPath: '',
    };
    this.selectedProjects = person.projects;

    this.newPath = person.imgPath;
    this.editPersonObject = this.personDetails[index];
    f.setValue(Oldperson);
    this.isEditMode = true;
  }
  theme = {
    primary: '#3B7DDD',
    secondary: '#6c757d',
    success: '#1cbb8c',
    info: '#17a2b8',
    warning: '#fcb92c',
    danger: '#dc3545',
    white: '#fff',
    'gray-100': '#f8f9fa',
    'gray-200': '#e9ecef',
    'gray-300': '#dee2e6',
    'gray-400': '#ced4da',
    'gray-500': '#adb5bd',
    'gray-600': '#6c757d',
    'gray-700': '#495057',
    'gray-800': '#343a40',
    'gray-900': '#212529',
    black: '#000',
  };

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    try {
      this.deleteModal = new bootstrap.Modal(
        document.getElementById('myModal'),
        {}
      );
      this.addModal = new bootstrap.Modal(
        document.getElementById('addModal'),
        {}
      );
    } catch (e) {
      console.log(e);
    }
  }

  onItemSelect(item: any) {
    this.filters.status.push(item.item_text);
  }
  onSelectAll(items: any) {
    // this.filters.status = items.values();
    items.values().forEach((element) => {
      this.onItemSelect(element);
    });
  }
  ngOnInit() {
    this.personDetails = this.employeesService.getEmployees();
    this.projectsDropDown = [
      { item_id: 1, item_text: 'Adminkit' },
      { item_id: 2, item_text: 'Bookrau' },
      { item_id: 3, item_text: 'Jadoo' },
      { item_id: 4, item_text: 'Lifton' },
      { item_id: 5, item_text: 'Alpha' },
    ];
    this.filterDropDown = [
      { item_id: 1, item_text: 'Trainee' },
      { item_id: 2, item_text: 'Junior' },
      { item_id: 3, item_text: 'Internee' },
      { item_id: 4, item_text: 'Senior' },
    ];

    this.projectsDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.filterDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false,
    };

    document.addEventListener('DOMContentLoaded', () => {
      try {
        feather.replace();
      } catch (e) {
        console.log('You might have made a typo with one of the feather icons');
        console.log(e);
      }
    });

    (window as any).feather = feather;

    const initialize = () => {
      initializeSimplebar();
      initializeSidebarCollapse();
    };

    const initializeSimplebar = () => {
      const simplebarElement =
        document.getElementsByClassName('js-simplebar')[0];

      if (simplebarElement) {
        const simplebarInstance = new SimpleBar(
          document.getElementsByClassName('js-simplebar')[0] as any
        );

        /* Recalculate simplebar on sidebar dropdown toggle */
        const sidebarDropdowns = document.querySelectorAll(
          '.js-sidebar [data-bs-parent]'
        );

        sidebarDropdowns.forEach((link) => {
          link.addEventListener('shown.bs.collapse', () => {
            simplebarInstance.recalculate();
          });
          link.addEventListener('hidden.bs.collapse', () => {
            simplebarInstance.recalculate();
          });
        });
      }
    };

    const initializeSidebarCollapse = () => {
      const sidebarElement = document.getElementsByClassName('js-sidebar')[0];
      const sidebarToggleElement =
        document.getElementsByClassName('js-sidebar-toggle')[0];

      if (sidebarElement && sidebarToggleElement) {
        sidebarToggleElement.addEventListener('click', () => {
          sidebarElement.classList.toggle('collapsed');

          sidebarElement.addEventListener('transitionend', () => {
            window.dispatchEvent(new Event('resize'));
          });
        });
      }
    };

    // Wait until page is loaded
    document.addEventListener('DOMContentLoaded', () => initialize());
  }

  getFormattedDate(date: string) {
    return date ? moment(date).format('DD-MMM-YYYY') : '';
  }
}
