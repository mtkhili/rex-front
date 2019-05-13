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
  ambiances = null ;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public genServ : GeneralServiceService
  ) {
    
  }

  ngOnInit() { }

  ambiancesChanged() {
    this.genServ.getAmbiances().subscribe(result => {
      this.ambiances = result;
    });
    console.log(this.ambiances);
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

  goToMap() {
    this.navCtrl.navigateForward('/map');
  }

}
