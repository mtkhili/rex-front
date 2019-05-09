import { Component, OnInit } from '@angular/core';
import { ImagePage } from './../modal/image/image.page';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,

  ) {  }

  ngOnInit() {
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
