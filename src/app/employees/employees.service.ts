export default class EmployeesService {
  private employees = [
    {
      name: 'Vanessa Tucker',
      phone: '864-348-0485',
      dob: '1961-04-12',
      gender: 'male',
      projects: [
        { item_id: 1, item_text: 'Adminkit' },
        { item_id: 2, item_text: 'Bookrau' },
      ],
      status: 'Trainee',
      citizenship: true,
      imgPath: '../assets/img/photos/1.jpg',
    },
    {
      name: 'William Harris',
      phone: '704-993-5435',
      dob: '2001-11-29',
      gender: 'female',
      projects: [
        { item_id: 1, item_text: 'Adminkit' },
        { item_id: 2, item_text: 'Bookrau' },
      ],
      status: 'Junior',
      citizenship: true,
      imgPath: '../assets/img/photos/2.jpg',
    },
    {
      name: 'Robin Schneiders',
      phone: '653-318-1259',
      dob: '1965-02-17',
      gender: 'female',
      projects: [
        { item_id: 1, item_text: 'Adminkit' },
        { item_id: 2, item_text: 'Bookrau' },
      ],
      status: 'Internee',
      citizenship: false,
      imgPath: '../assets/img/photos/4.jpg',
    },
    {
      name: 'Sharon Lessman',
      phone: '762-123-897',
      dob: '1999-09-01',
      gender: 'female',
      projects: [
        { item_id: 1, item_text: 'Adminkit' },
        { item_id: 2, item_text: 'Bookrau' },
      ],
      status: 'Senior',
      citizenship: false,
      imgPath: '../assets/img/photos/6.jpg',
    },
  ];

  getEmployees() {
    return this.employees.slice();
  }
  deleteEmployee(index) {
    this.employees.splice(index, 1);
  }
  addEmployee(employee) {
    this.employees.push(employee);
  }
  nameFilter(obj) {
    var filteredEmployees = this.employees
      .filter((employee) =>
        employee.name.toLowerCase().includes(obj.name.toLowerCase())
      )
      .slice();
    if (obj.status.length > 0)
      filteredEmployees = filteredEmployees
        .filter((employee) => {
          return obj.status.includes(employee.status);
        })
        .slice();

    return filteredEmployees;
  }
}
