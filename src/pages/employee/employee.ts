import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { ImageProvider } from './../../providers/image/image';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import couchdb from 'couchdb';

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;

  private employee: any = {};
  private canDelete = false;
  private canUpdate = false;
  private canAdd = true;
  private db;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empProv: EmployeeProvider,
    public viewCtrl: ViewController,
    public imgProv: ImageProvider,
    public alertCtrl: AlertController
  ) {}

  ionViewDidEnter() {
    var employee = this.navParams.get('employee');
    if (employee) {
      this.employee = employee.doc;
      this.db = new couchdb('employees');
      this.canDelete = true;
      this.canUpdate = true;
      this.canAdd = false;
    }
    
  }
  homepage() {
    this.navCtrl.push(HomePage);
  }
  addOrUpdate() {
    if (this.employee.firstName != undefined && this.employee.lastName != undefined) {
      if (this.canUpdate) {
        this.empProv.update(this.employee);
        console.log('naam: ', this.uname.value );
      }
    else {
          // wordt verwijst naar de creatEm provider/employee
          this.empProv.createEm(this.employee);
        }
    }
    this.viewCtrl.dismiss(this.employee);
   
  }

  delete() {
    this.empProv.delete(this.employee);
    this.viewCtrl.dismiss(this.employee);
  }

  takePhotograph() {
    this.imgProv.takePhotograph()
      .then((image) => {
         this.employee._attachments = { 'Profile.png': {
             content_type: 'image/png',
             data: image.toString()
          }
         }
         console.log(this.employee);
      })
      .catch((err) => {
         console.log(err);
      });
   }
  login() {
    this.navCtrl.push(LoginPage)
  }
}
