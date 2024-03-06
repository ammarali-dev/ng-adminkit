import { Component, ElementRef, ViewChild } from '@angular/core';
import SimpleBar from 'simplebar';
import Chart from 'chart.js';
import jsVectorMap from 'jsvectormap';
import feather from 'feather-icons';
import flatpickr from 'flatpickr';
import 'jsvectormap/dist/maps/world.js';
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';
import moment from 'moment';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  newPath = null;
  addPersonItem(f: NgForm) {
    this.isEditMode = false;
    this.newPath = null;
    f.reset();
    this.addModal.show();
  }
  isEditMode = false;
  testDate = '1961-04-12';
  // 30-Nov-2023
  editPersonObject = null;
  personDetails = [
    {
      name: 'Vanessa Tucker',
      phone: '864-348-0485',
      dob: '1961-04-12',
      imgPath: '../assets/img/photos/1.jpg',
    },
    {
      name: 'William Harris',
      phone: '704-993-5435',
      dob: '2001-11-29',
      imgPath: '../assets/img/photos/2.jpg',
    },
    {
      name: 'Robin Schneiders',
      phone: '653-318-1259',
      dob: '1965-02-17',
      imgPath: '../assets/img/photos/4.jpg',
    },
    {
      name: 'Sharon Lessman',
      phone: '762-123-897',
      dob: '1999-09-01',
      imgPath: '../assets/img/photos/6.jpg',
    },
  ];
  deleteModal = null;
  addModal = null;

  selectedPerson;
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
    if (f.valid && !this.isEditMode) {
      console.log(this.newPath);
      const obj = {
        name: f.value.name,
        phone: f.value.phone,
        dob: f.value.dob,
        imgPath: this.newPath,
      };
      console.log(obj);
      this.personDetails.push(obj);
      this.addModal.hide();
    } else if (f.valid && this.isEditMode) {
      var index = this.personDetails.indexOf(this.editPersonObject);
      this.personDetails[index] = {
        name: f.value.name,
        phone: f.value.phone,
        dob: f.value.dob,
        imgPath: this.newPath,
      };
      f.reset();
      this.addModal.hide();
    }
    this.isEditMode = false;
  }

  deletePerson() {
    let index = this.personDetails.indexOf(this.selectedPerson);
    this.personDetails.splice(index, 1);

    // this.personDetails;
    this.deleteModal.hide();
  }
  selectPerson(person) {
    this.selectedPerson = person;
  }

  editModelRow(person, f: NgForm) {
    let index = this.personDetails.indexOf(person);

    const Oldperson = {
      name: person.name,
      phone: person.phone,
      dob: person.dob,
      imgPath: '',
    };

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

  constructor() {}

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
  ngOnInit() {
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
