import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { NavController, MenuController, LoadingController, ModalController } from '@ionic/angular';
import { GeneralServiceService } from 'src/app/services/general-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private genService: GeneralServiceService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fname': [null, Validators.compose([
        Validators.required
      ])],
      'lname': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  // Dismiss Register Modal
  dismissRegister() {
    // this.modalController.dismiss();
  }

  async register(form: NgForm){
    console.log(form.value.fname + form.value.lname + form.value.email + form.value.password);

    this.genService.register(form.value.fname, form.value.lname, form.value.email, form.value.password).subscribe(data => {
      this.genService.login(form.value.email, form.value.password).subscribe(
        data => {

        },
        error => {
          console.log(error);
        },
        () => {
          //this.dismissRegister();
          this.navCtrl.navigateRoot('/home-results');
        }
      );
      //this.alertService.presentToast(data['message']);
    },
    error => {
      console.log(error);
    },
    () => {

    }
    );
  }

  /*
  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });
  }
  */

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
