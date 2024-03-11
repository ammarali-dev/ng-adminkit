import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import EmployeesService from '../employees.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  projectsDropDown = [];
  selectedProjects = [];
  projectsDropdownSettings = {};
  gender = '';
  newPath: any;
  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  ngOnInit(): void {
    this.projectsDropDown = [
      { item_id: 1, item_text: 'Adminkit' },
      { item_id: 2, item_text: 'Bookrau' },
      { item_id: 3, item_text: 'Jadoo' },
      { item_id: 4, item_text: 'Lifton' },
      { item_id: 5, item_text: 'Alpha' },
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
  }
  addPerson(f: any) {
    console.log(f.value, this.gender);

    if (f.valid && this.gender && this.newPath) {
      // console.log(this.newPath);
      const employee = {
        name: f.value.name,
        phone: f.value.phone,
        dob: f.value.dob,
        status: f.value.status,
        projects: f.value.projects,
        imgPath: this.newPath,
        gender: this.gender,
      };
      this.employeesService.addEmployee(employee);

      // this.personDetails.push(obj);
      // this.addModal.hide();
      // this.isEditMode = false;
      f.reset();
      this.router.navigate(['../'], { relativeTo: this.route });
    }
    console.log('HEEE');
  }
}
