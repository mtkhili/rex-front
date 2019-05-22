import { Component, OnInit } from '@angular/core';
import { ImagePage } from './../modal/image/image.page';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import {ModalController,   NavController} from '@ionic/angular';
import { GeneralServiceService } from './../../services/general-service.service';

import {
  ToastController,
  Platform
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: GoogleMap;
  address:string;
  mapData : any;
  eventData : any;
  
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private platform: Platform,
    public genServ : GeneralServiceService
  ) {  }

  ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    this.platform.ready();
    this.loadMap();
  }
 
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      // camera: {
      //   target: {
      //     lat: 43.0741704,
      //     lng: -89.3809802
      //   },
      //   zoom: 18,
      //   tilt: 30
      // }
    });
    this.goToMyLocation();
  }
 
  goToMyLocation(){
    this.map.clear();
 
    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => { 
      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 12,
        duration: 5000
      });

      this.mapData = this.genServ.getMapDataObject();
 
      this.mapData.forEach(loc => {
        //add a marker
        let marker: Marker = this.map.addMarkerSync({
          title: loc.titre,
          snippet: 'Clicker ici pour plus d\'information !',
          position: {
            lat: loc.latitude,
            lng: loc.longitude
          },
          animation: GoogleMapsAnimation.BOUNCE,
        });
        marker.set("eventId", loc.id);
        //show the infoWindow
        marker.showInfoWindow();
  
        //If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          console.log(marker.get("eventId"));
          this.genServ.getEventData(marker.get("eventId"))
          .subscribe(res => {
            this.eventData = res;
            console.log(this.eventData);
            this.genServ.setEventDataObject(this.eventData);
            this.navCtrl.navigateForward('/about');
          }, err => {
            console.log(err);
          });
        });
      });
    })
    .catch(err => {
      //this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
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
