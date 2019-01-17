import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmployeeProvider } from './../../providers/employee/employee';
import { ImageProvider } from './../../providers/image/image';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-updateuser',
  templateUrl: 'updateuser.html',
})
export class UpdateuserPage {

  private employee: any = {};
  private canDelete = true;
  private canUpdate = true;
  private canAdd = false;

  public myPhoto: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empProv: EmployeeProvider,
    public viewCtrl: ViewController,
    public imgProv: ImageProvider,
    private camera: Camera
  ) { }

  ionViewDidEnter() {
    var employee = this.navParams.get('employee');
    if (employee) {
      this.employee = employee.doc;
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
      }
      else {
        this.empProv.createEm(this.employee);
      }
    }
    this.viewCtrl.dismiss(this.employee);
  }

  delete() {
    this.empProv.delete(this.employee);
    this.viewCtrl.dismiss(this.employee);
  }
  takePhotograph(myPhoto) {
    this.imgProv.takePhotograph()
      .then((myPhoto) => {
        this.employee._attachments = {
          'image.png': {
            content_type: 'image.png',
            data: myPhoto.toString()
          }
        };
        console.log(this.employee);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  OpenCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {

      console.log(imageData);
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      this.takePhotograph(this.myPhoto);
    }, (err) => {
    });
  }

}
