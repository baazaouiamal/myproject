import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to user's edit form
  
  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ){ }

  ngOnInit() {
    this.updateUserData();   // Call updateUserData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetUser(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  // Accessing form control using getters
  get fullName() {
    return this.editForm.get('fullName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get phone() {
    return this.editForm.get('phone');
  }  

  // Contains Reactive Form logic
  updateUserData() {
    this.editForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateUser(this.editForm.value);       // Update user data using CRUD API
    this.toastr.success(this.editForm.controls['fullName'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-users']);               // Navigate to user's list page when user data is updated
  }

}