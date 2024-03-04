import { Component } from '@angular/core';
import SimpleBar from 'simplebar';
import Chart from 'chart.js';
import jsVectorMap from 'jsvectormap';
import feather from 'feather-icons';
import flatpickr from 'flatpickr';
import 'jsvectormap/dist/maps/world.js';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  personDetails = [
    { name: 'Vanessa Tucker', phone: '864-348-0485', dob: 'June 21, 1961' },
    { name: 'William Harris', phone: '704-993-5435', dob: 'May 15, 1948' },
    {
      name: 'Robin Schneiders',
      phone: '653-318-1259',
      dob: 'September 14, 1965',
    },
    { name: 'Sharon Lessman', phone: '762-123-897', dob: 'April 2, 1971' },
  ];
  myModal = null;
  selectedPerson;
  deletePerson() {
    console.log(this.personDetails.includes(this.selectedPerson));

    this.personDetails.splice(
      this.personDetails.indexOf(this.selectedPerson),
      1
    );
    // this.personDetails;
    this.myModal.hide();
  }
  selectPerson(person) {
    this.selectedPerson = person;
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
      console.log('Timeouyt');
      this.myModal = new bootstrap.Modal(
        document.getElementById('myModal'),
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
}
