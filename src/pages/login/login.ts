import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, ModalController} from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { WelkomePage } from '../welkome/welkome';
import { HomePage } from '../home/home';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') uname;
  @ViewChild('password') password;
  
  private employees: any;
  private canUpdate = false;
  private voornaam : string;
  private achternaam: string;


  constructor(
    private empProv: EmployeeProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController
    ) {
  }
  ionViewDidEnter() {/*
    var employee = this.navParams.get('employee');
    if (employees) {
      this.employee = employee.doc;
      this.canUpdate = true;
    } */
    console.log("de lees methode wordt uitgevoerd");
    console.log(this.reReadEmployees());
      /*
      for(let i=0; i< this.employees.data.rows.count();i++){
        console.log(this.employees.data.rows[i].doc.firstName);
      }*/
  }
  homepage(){
    this.navCtrl.push(HomePage);
  }
  
  reReadEmployees() {
    console.log("admin?");
    this.empProv.read()
      .then(data => {
        this.employees = data.rows[0].doc.firstName;
        this.voornaam = data.rows[0].doc.firstName;
        console.log("employee:" + this.voornaam);
      });
      for (let i = 0; i < this.employees.rows.doc.length; i++) {
        console.log(this.employees.rows.doc[i]);
      }
  }
  singnIn() {
    
    console.log("ik kom in de singnIn methode terecht");
    //this.navCtrl.push(WelkomePage)
    var employee = this.navParams.get('employee');
    // er moet nagekeken worden of de gebruiker al bestaat
    if (this.uname.value == "admin" && this.password.value == "admin"){
      let alert = this.alertCtrl.create({
        title: 'Login Successful',
        subTitle: 'You are logged in',
        buttons: ['OK']
      });
       alert.present();
    
      this.navCtrl.push(WelkomePage)
      console.log('Login Successful')
      console.log('naam: ',this.uname.value,', password: ',this.password.value);
      
    }
    else {
      console.log('naam: ',this.uname.value,', password: ',this.password.value);
    }
  }
  
  addEmployee() {
    let modal = this.modalCtrl.create('EmployeePage', { employee: null });
    modal.onDidDismiss(data => {
      this.reReadEmployees()
    });
    modal.present();
  } 
}
