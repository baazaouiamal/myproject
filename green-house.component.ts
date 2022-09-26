import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Value } from '../green-house/value';



@Component({
  selector: 'app-green-house',
  templateUrl: './green-house.component.html',
  styleUrls: ['./green-house.component.css']
})
export class GreenHouseComponent implements OnInit {
  title = 'dashboard';
  Value  = [];
  valuesRef: AngularFireList<any>;  
  constructor(private db: AngularFireDatabase){}
  //Datatabe settings
  dtOptions: DataTables.Settings = {};
  // Check to show datatabe when firebase data comes
  isShow = false;
  ngOnInit(){
  //Get Data from firebase Database
  this.valuesRef = this.db.list('values-list');
  
  //Embed Data Into Array Variable
  this.valuesRef.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
    this.Value = [];
    data.forEach(item => {
      let a = this.newMethod(item); 
      a['$key'] = item.key;
      this.Value.push(a as Value);
    })
    console.log(this.Value);
    //Datatable settings and showing
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true
    };
    this.isShow = true;
  })
  
}

  private newMethod(item) {
    return item.payload.toJSON();
  }
}
