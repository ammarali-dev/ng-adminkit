import { Component } from '@angular/core';
import SimpleBar from 'simplebar';
import Chart from 'chart.js';
import jsVectorMap from 'jsvectormap';
import feather from 'feather-icons';
import flatpickr from 'flatpickr';
import * as bootstrap from 'bootstrap';
// Usage: https://feathericons.com/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
  markers = [
    {
      coords: [31.230391, 121.473701],
      name: 'Shanghai',
    },
    {
      coords: [28.70406, 77.102493],
      name: 'Delhi',
    },
    {
      coords: [6.524379, 3.379206],
      name: 'Lagos',
    },
    {
      coords: [35.689487, 139.691711],
      name: 'Tokyo',
    },
    {
      coords: [23.12911, 113.264381],
      name: 'Guangzhou',
    },
    {
      coords: [40.7127837, -74.0059413],
      name: 'New York',
    },
    {
      coords: [34.052235, -118.243683],
      name: 'Los Angeles',
    },
    {
      coords: [41.878113, -87.629799],
      name: 'Chicago',
    },
    {
      coords: [51.507351, -0.127758],
      name: 'London',
    },
    {
      coords: [40.416775, -3.70379],
      name: 'Madrid ',
    },
  ];
  title = 'ng-adminkit';
  chartjsDashboardLine: any = [];
  chartjsDashboardPie: any = [];
  chartjsDashboardBar: any = [];
  map: any;
  date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  defaultDate =
    this.date.getUTCFullYear() +
    '-' +
    (this.date.getUTCMonth() + 1) +
    '-' +
    this.date.getUTCDate();
  gradient: any;

  lastProjects = [
    {
      name: 'Project Apollo',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'Done',
      assignee: 'Vanessa Tucker',
    },
    {
      name: 'Project Fireball	',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'Cancelled',
      assignee: '	William Harris',
    },
    {
      name: 'Project Hades',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'Done',
      assignee: 'Sharon Lessman',
    },
    {
      name: 'Project Nitro',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'In progress',
      assignee: 'Vanessa Tucker',
    },
    {
      name: 'Project Phoenix',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'Done',
      assignee: 'William Harris',
    },
    {
      name: 'Project X',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'Done',
      assignee: 'Sharon Lessman',
    },
    {
      name: 'Project Romeo',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'Done',
      assignee: 'Christina Mason',
    },
    {
      name: 'Project Wombat',
      startDate: '01/01/2023',
      endDate: '31/06/2023',
      status: 'In progress',
      assignee: 'William Harris',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    try {
      feather.replace();
    } catch (e) {
      console.log('You might have made a typo with one of the feather icons');
      console.log(e);
    }

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
    document.addEventListener('DOMContentLoaded', () => initialize());
  }
}
