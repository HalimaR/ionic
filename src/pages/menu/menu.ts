import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { AccountdbPage } from '../accountdb/accountdb';
import { HomePage } from '../home/home';
import { InstellingenPage } from '../instellingen/instellingen';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
 
  public id: string;
  private user;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProv: EmployeeProvider,
    public modalCtrl: ModalController,
    ) 
  {
  this.id = this.navParams.get('data');
  }

  ionViewDidEnter() {
    this.userProv.read()
      .then(data => {
        this.user = data.rows;
      });
  }

  showDetails(user) {
    let modal = this.modalCtrl.create('EmployeePage', { employee: user });
    modal.onDidDismiss(data => {
      this.reReadEmployees();
    });
    modal.present();
  }
  reReadEmployees() {
    this.userProv.read()
      .then(data => {
        //this.employees = data.rows;
        console.log(this.user = data.rows);
      });
  }
  accountdb() {
    this.navCtrl.push(AccountdbPage);
    
  }
  homepage(){
    this.navCtrl.push(HomePage);
  }
  instellingen() {
    this.navCtrl.push(InstellingenPage);
  }
  
}
