import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from './../../services/general-service.service';
import { Observable } from 'rxjs';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

// Modals
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {
  searchKey = '';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  ambiances: any ;
  categories: any ;
  mapData: any ;

  age: any;
  typeActivite: any;
  categorie: any;
  temps: any;
  prix: any;
  parameters: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public genServ : GeneralServiceService,
    public LoadingController : LoadingController
  ) {
  }

  ngOnInit() {
    this.getData();
   }

  async getData() {
    const loading = await this.LoadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.genServ.getData()
      .subscribe(res => {
        this.ambiances = res['ambiances'];
        this.categories = res['categories'];
        console.log(this.categories);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  

  settings() {
    this.navCtrl.navigateForward('settings');
  }

   async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  async goToMap() {
    const loading = await this.LoadingController.create({
      message: 'Loading'
    });
    await loading.present();

    this.genServ.getMapData(this.parameters)
      .subscribe(res => {
        this.mapData = res;
        console.log(this.mapData);
        this.genServ.setMapDataObject(this.mapData);
        loading.dismiss();
        this.navCtrl.navigateForward('/map');
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  public optionsFn(): void { //here item is an object 
    this.parameters = [this.age, this.typeActivite, this.categorie, this.temps, this.prix].filter(Boolean).join("/");
    console.log(this.parameters);
  }

}