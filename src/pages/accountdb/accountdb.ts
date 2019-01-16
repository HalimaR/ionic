import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { MatchenProvider } from '../../providers/matchen/matchen';
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
  public sex: string;
  
  private likeLijst: Array<string> = [];
  private vrouwenLijst: Array<string> = [];
  private mannenLijst: Array<string> = [];
  private gevonden: Array<string>;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public empProv: EmployeeProvider,
    public matchProv: MatchenProvider,
    public navParams: NavParams
  ) 
  { 
    this.id = this.navParams.get('data');
    
  }

  ionViewDidEnter() {
    this.empProv.read()
      .then(data => {
//Probleem 1) omdat data uit 6 objecten bestaat word er 6x push gedaan
        
        if (this.sex == "man") {
          this.employees = this.mannenLijst
          console.log("if man");
        }
        else if (this.sex == "vrouw"){
          this.employees = this.vrouwenLijst
          console.log(this.vrouwenLijst);
        }
        else {
          this.employees = data.rows;
          console.log("else"+this.sex);
        }
      });
  }
  loopDoorData(){
    this.empProv.read()
    .then(data => {
      this.vrouwenLijst.length = 0;
      this.mannenLijst.length = 0;
      for (let i = 0; i < data.rows.length; i++) {
        if ("vrouw" == data.rows[i].doc.sex) {
          this.vrouwenLijst.push(data.rows[i]);
        }
        else if ("man" == data.rows[i].doc.sex) {
          this.mannenLijst.push(data.rows[i]);
        }
      }
    });
  }
  menupage() {
    //data van de menu pagina terug krijgen
    let modal = this.modalCtrl.create(MenuPage, { data: this.id });
    modal.onDidDismiss((geslacht) => {
      this.sex = geslacht;
      console.log(this.sex);
      this.loopDoorData();
      console.log(this.ionViewDidEnter());
    })
    modal.present();
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
      //console.log("swiped to left");
    }
    if (event.direction === 4) {
      
      //console.log("swiped to right");
    }
  }
  match(){
    let Lijst: Array<string>;
    Lijst = this.matchProv.matchToevoegen(this.id,this.likeLijst);
  }
  ///deze methode moet maar 1x gebrueren
  matchZoeken(): Array<string> {
   this.gevonden = this.matchProv.matchZoeken(this.id);
   return this.gevonden;
  }
  
 like(employee){
   this.likeLijst.push(employee.id);
   (this.employees).splice(employee,1);
   
     let gevonden: string;
     gevonden = this.matchProv.matchGevonden(employee.id, this.matchZoeken());
   if (gevonden != undefined) {
     let alert = this.alertCtrl.create({
       title: 'je hebt een match',
       subTitle: '' + gevonden,
       buttons: ['OK']
     });
     alert.present();
   }
 }
 hide(employee){
   (this.employees).splice(employee, 1);
   //console.log("put");
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
  /*
  getPic(emp){
    if(emp){
      return this.empProv.getPic(emp);
    }
  }
  */
}
