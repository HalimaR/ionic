import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { LoginPage} from '../login/login';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-welkome',
  templateUrl: 'welkome.html',
})
export class WelkomePage {
  private employees;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public empProv: EmployeeProvider
  ) { }


  ionViewDidEnter() {
    this.empProv.read()
      .then(data => {
        this.employees = data.rows;
      });
  }
    
  showDetails(employee) {
    let modal = this.modalCtrl.create('EmployeePage', { employee: employee });
    modal.onDidDismiss(data => {
      this.reReadEmployees();
    });
    modal.present();
  }

  addEmployee() {
    let modal = this.modalCtrl.create('EmployeePage', { employee: null });
    modal.onDidDismiss(data => {
      this.reReadEmployees()
    });
    modal.present();
  }

  reReadEmployees() {
    this.empProv.read()
      .then(data => {
        //this.employees = data.rows;
        console.log("nu zit je in reRead van welkom");
        console.log(this.employees = data.rows);
      });
  }
  swipe(event) {
    if (event.direction === 2) {
      console.log("swiped to left");
    }
    if (event.direction === 4) {
      console.log("swiped to right");
    }
  }

  login(){
    this.navCtrl.push(LoginPage)
  }

  homepage() {
    this.navCtrl.push(HomePage);
    let alert = this.alertCtrl.create({
      title: 'Log out Successful',
      subTitle: 'You are logged out',
      buttons: ['OK']
    });
    alert.present();
  }
}
