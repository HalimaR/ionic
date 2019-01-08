import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { LoginPage} from '../login/login';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-welkome',
  templateUrl: 'accountdb.html',
})
export class  AccountdbPage {
  private employees;
  public id: string;
  private likeLijst: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public empProv: EmployeeProvider,
    public navParams: NavParams
  ) 
  { 
    this.id = this.navParams.get('data');
  }

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
 like(employee){
   this.likeLijst.push(employee.id);
   console.log(this.likeLijst);
 }
 hide(){
   console.log("put");
 }
  login(){
    this.navCtrl.push(LoginPage)
  }
  menupage() {
    this.navCtrl.push(MenuPage);
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
