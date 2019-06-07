import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GeneralServiceService } from './../../services/general-service.service';

import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})


export class CreateEventPage implements OnInit {

 // public onCreatEventForm: FormGroup;

  public validations_form: FormGroup;
  public validation_messages: any;


  datePickerObj: any = {};
  selectedDate;
  selectedDateF;
  monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  weeksList = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  ambiances: any ;
  categories: any ;
  pays: any;
  provinces: any;
  idPays: any;
  selProv: any;

  age: any = 1;
  typeActivite: any = 1;
  categorie: any = 1;
  temps: any = 1;
  prix: any = 1;
  parameters: any;

  numeroRue: any;
  nomRue: any;
  ville: any;
  zipCode: any;

  // private nativeGeocoder: NativeGeocoder

  constructor(

    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    public LoadingController : LoadingController,
    public genServ : GeneralServiceService,
    public modalCtrl: ModalController,

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

    afficherProv(idPays){
      this.selProv = null;
      this.getProv();
    }

    async getProv() {
      const loading = await this.LoadingController.create({
        message: 'Loading'
      });
      await loading.present();
      this.genServ.getProvince(this.idPays)
        .subscribe(res => {
          this.provinces = res['provinces'];
           loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }


    public optionsFn(): void {
      this.parameters = [this.age, this.typeActivite, this.categorie, this.temps, this.prix].join("/");
     // console.log(this.parameters);
    }

    ngOnInit() {

      this.getData();

      this.getCountry();

      //validation Form

      this.validations_form = this.formBuilder.group({

        titre: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),

      });
    
      this.validation_messages = {
        'titre': [
          { type: 'required', message: 'Titre obligatoire.' }
        ],
        'description': [
          { type: 'required', message: 'Description obligatoire.' }
        ],
      };

      const disabledDates: Date[] = [
        new Date(1545911005644),
        new Date(),
        new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
        new Date("Wednesday, December 26, 2018"), // Works with any valid Date formats like long format
        new Date("12-14-2018") // Short format
      ];
  
      this.datePickerObj = {
        // inputDate: new Date('12'), // If you want to set month in dateObject of date-picker
        // inputDate: new Date('2018'), // If you want to set year in dateObject of date-picker
        // inputDate: new Date('2018-12'), // If you want to set year & month in dateObject of date-picker
        // inputDate: new Date('2018-12-01'), // If you want to set date in dateObject of date-picker
        // inputDate: '12', // If you want to set date as a string in date-picker
        // inputDate: '2018', // If you want to set date as a string in date-picker
        // inputDate: '2018-12', // If you want to set date as a string in date-picker
        // inputDate: '2018-12-12', // If you want to set date as a string in date-picker
        // inputDate: moment(new Date('12')), // If you want to set date as a moment object in date-picker
        // inputDate: moment(new Date('2018')), // If you want to set date as a moment object in date-picker
        // inputDate: moment(new Date('2018-12')), // If you want to set date as a moment object in date-picker
        // inputDate: moment(new Date('2018-12-12')), // If you want to set date as a moment object in date-picker
  
        // fromDate: new Date('2019-03-05'), // need this in order to have toDate
        // toDate: new Date('2019-03-28'),
        // showTodayButton: false,
        // closeOnSelect: true,
        // disableWeekDays: [],
        // mondayFirst: true,
        // setLabel: 'Select a Date',
        // todayLabel: 'Today',
        // closeLabel: 'Close',
        // disabledDates: [],
        // titleLabel: 'Select a Date',
        // monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        // weeksList: ['S', 'S', 'M', 'T', 'W', 'T', 'F'],
        dateFormat: "YYYY-MM-DD",
        // clearButton: false,
        // momentLocale: 'pt-BR',
        // yearInAscending: true,
        // btnCloseSetInReverse: true,
  
        btnProperties: {
          expand: "block", // "block" | "full"
          fill: "", // "clear" | "default" | "outline" | "solid"
          size: "", // "default" | "large" | "small"
          disabled: "", // boolean (default false)
          strong: "", // boolean (default false)
          color: ""
          // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
        }
      };
    }

    async openDatePicker() {
      const datePickerModal = await this.modalCtrl.create({
        component: Ionic4DatepickerModalComponent,
        cssClass: "li-ionic4-datePicker",
        componentProps: { objConfig: this.datePickerObj }
      });
      await datePickerModal.present();
  
      datePickerModal.onDidDismiss().then(data => {
        // this.isModalOpen = false;
        console.log(data);
        this.selectedDate = data.data.date;
      });
    }

    async openDatePickerF() {
      const datePickerModal = await this.modalCtrl.create({
        component: Ionic4DatepickerModalComponent,
        cssClass: "li-ionic4-datePicker",
        componentProps: { objConfig: this.datePickerObj }
      });
      await datePickerModal.present();
  
      datePickerModal.onDidDismiss().then(data => {
        // this.isModalOpen = false;
        console.log(data);
        this.selectedDateF = data.data.date;
      });
    }

    onSubmit(values){
      console.log(values);
    }
}
