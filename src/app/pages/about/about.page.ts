import { Component, OnInit } from '@angular/core';
import { ImagePage } from './../modal/image/image.page';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { GeneralServiceService } from './../../services/general-service.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  eventData: any;
  url: any;

  constructor(
    public modalCtrl: ModalController,
    public genServ : GeneralServiceService
    ) {}

  ngOnInit() {
    this.eventData = this.genServ.getEventDataObject()[0];
    this.url = this.genServ.getUrl();
  }

  //Modal search
  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }
  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

}
