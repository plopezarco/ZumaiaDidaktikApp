import { Component, HostListener, OnInit } from '@angular/core';
import { Vector2d } from '../../sebastian-functions/vector2d';
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-jantziak-game',
  templateUrl: './jantziak-game.page.html',
  styleUrls: ['./jantziak-game.page.scss'],
})
export class JantziakGamePage implements OnInit {

  public imageDir = '../assets/img/jantzia.png';

  public soluzioa: Map<string, Vector2d> = new Map<string, Vector2d>([
    ['Zapia', new Vector2d(14, 9)],
    ['Gerruntzea', new Vector2d(78, 32)],
    ['Alkandora Txuria', new Vector2d(16, 48)],
    ['Mantala', new Vector2d(79, 65)],
    ['Gona', new Vector2d(18, 72)],
    ['Abarkak', new Vector2d(80, 86)]
  ]);

  public botoiak: string[] = Array.from(this.soluzioa.keys());

  public focus: string = '';

  public rect: DOMRect = new DOMRect();

  public answered: Set<string> = new Set<string>([]);

  public animated: Set<string> = new Set<string>([]);

  constructor(private route: Router, public alertController: AlertController) {
  }

  @HostListener('window:resize')
  ionViewDidEnter() {
    this.rect = document.querySelector('#monigote1').getBoundingClientRect();
  }

  getStyle(hitz: string): object {
    const v: Vector2d = this.soluzioa.get(hitz);
    const ret: object = {
      position: 'absolute',
      top: v.y * this.rect.height / 100 + 'px',
      left: (this.rect.left + v.x * this.rect.width / 100) + 'px',
      transform: 'translate(-50%, -50%)',
      'min-height': this.rect.height * 0.07 + 'px',
      'text-align': 'center',
      'max-width': this.rect.width * 0.3 + 'px',
      'font-size': `max(1em, ${this.rect.width * 0.05}px)`,
      'box-shadow': ''
    };
    if (!this.answered.has(hitz)) {
      ret['background-color'] = `#003${this.focus === '' ? 3 : 6}`;
      ret['min-width'] = this.rect.width * 0.2 + 'px';
      const p: [number, number][] = (<T,>(vInner: T[]): [T, T][] => {
        const retInner: [T, T][] = [];
        for (const x of vInner) {
          for (const y of vInner) {
            retInner.push([x, y]);
          }
        }
        return retInner;
      })([-3, 3]);
      for (const [i, j] of p) {
        ret['box-shadow'] += `${i}px ${j}px 5px #003${this.focus === '' ? 0 : 6}, `;
      }
      ret['box-shadow'] = ret['box-shadow'].slice(0, -2);
      console.log(ret['box-shadow']);
    }
    return ret;
  }


  onClick(hitz: string): void {
    this.focus = hitz;
  }

  onMouseDown(hitz: string): void {
    if (hitz === this.focus) {
      this.answered.add(hitz);
      if (this.answered.size >= this.soluzioa.size) {
        // We are done!
        this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Irabazi Duzu!',
          message: '<img src="https://img.freepik.com/vector-gratis/trofeo-oro-placa-ganador-concurso_68708-545.jpg?size=338&ext=jpg">',
          buttons: [{
            text: 'OK', handler: () => {
              this.route.navigate(['/map-page']);
            }
          }],
          backdropDismiss: false
        })
          .then(
            iEndAlert => Promise.all([iEndAlert.present(), iEndAlert.onDidDismiss()])
          )
      }
    }
    else {
      if (this.focus !== hitz && this.focus !== '') {
        this.animated.add(hitz);
      }
    }
    this.focus = '';
  }

  ngOnInit() {
    this.botoiak = [];
    for (const [hitza, _] of this.soluzioa) {
      this.botoiak.push(hitza);
    }
    this.shuffle(this.botoiak);
  }

  shuffle<T>(a: T[]): void {
    for (let i = a.length; i; --i) {
      const j = Math.floor(Math.random() * i);
      const x: T = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }
}
