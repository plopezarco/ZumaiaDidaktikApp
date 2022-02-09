import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-asmakizuna',
  templateUrl: './asmakizuna.page.html',
  styleUrls: ['./asmakizuna.page.scss'],
})
export class AsmakizunaPage implements OnInit {
  zenbakia: number;

  constructor(public alertController: AlertController) {}
  ngOnInit() {
  }

  konprobatu(){
    if(this.zenbakia==1540){
      alert("erantzun zuzena.");
    }else {
      alert("erantzun okerra.");
    }
  }
}