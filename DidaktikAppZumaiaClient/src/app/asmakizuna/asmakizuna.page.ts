import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-asmakizuna',
  templateUrl: './asmakizuna.page.html',
  styleUrls: ['./asmakizuna.page.scss'],
})
export class AsmakizunaPage implements OnInit {
  zenbakia: number;

  constructor(public alertController: AlertController, public route: Router) {}
  ngOnInit() {
  }

  konprobatu(){
    if(this.zenbakia==1540){
      this.presentAlertConfirm() 
    }else{
      this.txarto();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Irabazi Duzu!',
      message: '<img src="https://img.freepik.com/vector-gratis/trofeo-oro-placa-ganador-concurso_68708-545.jpg?size=338&ext=jpg">',
      buttons: [{
        text: 'OK', handler: () => {
            this.route.navigate(['/map-page']);
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }

  async txarto() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erantzun Okerra!',
      message: 'Saiatu Berriz',
      buttons: [{
        text: 'OK', handler: () => {
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }
}