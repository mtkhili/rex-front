import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServiceService } from './../../services/general-service.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {

  public onCreatEventForm: FormGroup;

  ambiances: any ;
  categories: any ;
  pays: any;
  provinces: any;
  idPays: any;

  age: any = 1;
  typeActivite: any = 1;
  categorie: any = 1;
  temps: any = 1;
  prix: any = 1;
  parameters: any;

  constructor(

    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public LoadingController : LoadingController,
    public genServ : GeneralServiceService


    ) { }

    async getData() {
      const loading = await this.LoadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.genServ.getData()
        .subscribe(res => {
          this.ambiances = res['ambiances'];
          this.categories = res['categories'];
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    async getCountry() {
      const loading = await this.LoadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.genServ.getCountry()
        .subscribe(res => {
          this.pays = res['pays'];
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

    async getProv(idPays) {
      const loading = await this.LoadingController.create({
        message: 'Loading'
      });
      await loading.present();
      console.log(this.idPays);
      this.genServ.getProvince()
        .subscribe(res => {
          this.provinces = res['provinceName'];
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }


    public optionsFn(): void {
      this.parameters = [this.age, this.typeActivite, this.categorie, this.temps, this.prix].join("/");
      console.log(this.parameters);
    }

  ngOnInit() {

    this.getData();

    this.getCountry();

    this.getProv(1);
  
  }

  async sendData() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Event was Created!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/home-results');
    });
  }

}
