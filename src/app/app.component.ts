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
  constructor() {}

  ngOnInit() {
    var map = new jsVectorMap({
      map: 'world',
      selector: '#world_map',
      zoomButtons: true,
      markers: this.markers,
      markerStyle: {
        initial: {
          r: 9,
          strokeWidth: 7,
          stokeOpacity: 0.4,
          fill: this.theme.primary,
        },
        hover: {
          fill: this.theme.primary,
          stroke: this.theme.primary,
        },
      },
      zoomOnScroll: false,
    });
    window.addEventListener('resize', () => {
      map.updateSize();
    });
    document.addEventListener('DOMContentLoaded', () => {
      var ctx = (
        document.getElementById('chartjs-dashboard-line') as any
      ).getContext('2d');
      console.log(ctx);
      this.gradient = ctx.createLinearGradient(0, 0, 0, 225);
      this.gradient.addColorStop(0, 'rgba(215, 227, 244, 1)');
      this.gradient.addColorStop(1, 'rgba(215, 227, 244, 0)');

      console.log(this.gradient);

      this.chartjsDashboardLine = new Chart('chartjs-dashboard-line', {
        type: 'line',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'Sales ($)',
              fill: true,
              backgroundColor: this.gradient,
              borderColor: this.theme.primary,
              data: [
                2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438,
                2917, 3327,
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            intersect: false,
          },
          hover: {
            intersect: true,
          },
          plugins: {
            filler: {
              propagate: false,
            },
          },
          scales: {
            xAxes: [
              {
                reverse: true,
                gridLines: {
                  color: 'rgba(0,0,0,0.0)',
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  stepSize: 1000,
                },
                display: true,
                borderDash: [3, 3],
                gridLines: {
                  color: 'rgba(0,0,0,0.0)',
                },
              },
            ],
          },
        },
      });

      this.chartjsDashboardPie = new Chart('chartjs-dashboard-pie', {
        type: 'pie',
        data: {
          labels: ['Chrome', 'Firefox', 'IE'],
          datasets: [
            {
              data: [4306, 3801, 1689],
              backgroundColor: [
                this.theme.primary,
                this.theme.warning,
                this.theme.danger,
              ],
              borderWidth: 5,
            },
          ],
        },
        options: {
          responsive: !(window as any).MSInputMethodContext,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          cutoutPercentage: 75,
        },
      });

      this.chartjsDashboardBar = new Chart('chartjs-dashboard-bar', {
        type: 'bar',
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'This year',
              backgroundColor: this.theme.primary,
              borderColor: this.theme.primary,
              hoverBackgroundColor: this.theme.primary,
              hoverBorderColor: this.theme.primary,
              data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
              barPercentage: 0.75,
              categoryPercentage: 0.5,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
                stacked: false,
                ticks: {
                  stepSize: 20,
                },
              },
            ],
            xAxes: [
              {
                stacked: false,
                gridLines: {
                  color: 'transparent',
                },
              },
            ],
          },
        },
      });
    });

    flatpickr('#datetimepicker-dashboard', {
      inline: true,
      prevArrow: '<span title="Previous month">&laquo;</span>',
      nextArrow: '<span title="Next month">&raquo;</span>',
      defaultDate: this.defaultDate,
    });

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
