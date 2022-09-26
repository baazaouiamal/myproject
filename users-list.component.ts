import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';  // CRUD API service class
import { User } from '../../shared/user';   // User interface class for Data types.
import { ToastrService } from 'ngx-toastr';    // Alert message using NGX toastr

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  User: User[];                 // Save users data in user's array.
  hideWhenNoUser: boolean = false; // Hide users data table when no user.
  noData: boolean = false;            // Showing No User  Message, when no  user in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(
    public crudApi: CrudService, // Inject user CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize user's list, when component is ready
    let s = this.crudApi.GetUsersList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.User = [];
      data.forEach(item => {
        let a = this.newMethod(item); 
        a['$key'] = item.key;
        this.User.push(a as User);
      })
    })
  }

  private newMethod(item) {
    return item.payload.toJSON();
  }

  // Using valueChanges() method to fetch simple list of users data. It updates the state of hideWhenNoUser, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetUsersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoUser = false;
        this.noData = true;
      } else {
        this.hideWhenNoUser= true;
        this.noData = false;
      }
    })
  }
  // Method to delete user object
  deleteUser(user) {
    if (window.confirm('Are sure you want to delete this user ?')) { // Asking from user before Deleting user data.
      this.crudApi.DeleteUser(user.$key) // Using Delete user API to delete user.
      this.toastr.success(user.fullName + ' successfully deleted!'); // Alert message will show up when users successfully deleted.
    }
  }

}