import {Component, HostListener, OnInit} from '@angular/core';
import {StadiumInGrid} from '../../sebastian-functions/stadium-in-grid';
import {Vector2d, Vector2dCssUnit} from '../../sebastian-functions/vector2d';
import {convertCssUnit as cu} from '../../sebastian-functions/convertCssUnit';
import {Segment2d} from '../../sebastian-functions/segment2d';
import {CssDistanceUnit} from '../../sebastian-functions/css-distance-unit';
import {Grid2dCssUnit} from '../../sebastian-functions/grid2d';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-word-search-game',
  templateUrl: './word-search-game.page.html',
  styleUrls: ['./word-search-game.page.scss'],
})
export class WordSearchGamePage implements OnInit {

  private parent: HTMLDivElement;
  private rect: DOMRect;

  private stg: StadiumInGrid;

// parameter for StadiumInGrid constructor.
  private stgParameter: {
    start: Vector2dCssUnit;
    blankSpace: {length: number; unit: CssDistanceUnit};
    quantity: Vector2d;
  };


  private readonly oldStgs: StadiumInGrid[];


// Here correct answers will be stored.
  private answered: Set<number>;


// store answers in Segment2d array
  private answer: Segment2d[];

  private readonly mousePosition: Segment2d;

  private mouseIsDown = false;


  constructor(private route: Router, public alertController: AlertController) {
    this.parent = null;
    this.rect = null;
    this.stg = null;
    this.stgParameter = null;
    this.oldStgs = [];
    this.answered = new Set();
    this.answer = ((arr: [number,number,number,number][]): Segment2d[] => {
        const ret: Segment2d[] = [];
        for (const seg of arr) {
          ret.push(new Segment2d({
            start: new Vector2d(seg[0], seg[1]),
            end: new Vector2d(seg[2], seg[3])
          }));
        }
        return ret;
      }
    )([[3, 0, 9, 0], [1, 1, 5, 1], [0, 3, 8, 3], [3, 4, 8, 4], [0, 5, 5, 5], [3, 8, 8, 8]]);
    this.mouseIsDown = false;
    this.mousePosition = new Segment2d({start: new Vector2d(0, 0), end: new Vector2d(0, 0)});
  }

  get left(): number {
    return this.answer.length -this.answered.size;
  }

  get color(): string {
    return this.left === 0 ? 'success' : 'danger';
  }

  get target(): HTMLElement {
    return document.querySelector('ion-badge');
  }

  @HostListener('window:resize')
  private onResize() {
    this.rect = this.parent.getBoundingClientRect();
    this.stgParameter = {
      start: new Vector2dCssUnit(0.1 * this.rect.width, 0.1 * this.rect.height, 'px', 'px'),
      blankSpace: {length: 0.08 * this.rect.width, unit: 'px'},
      quantity: new Vector2d(10, 10)
    };
    const newGrid = new Grid2dCssUnit(this.stgParameter);
    for (const oldStg of this.oldStgs) {
      oldStg.grid = newGrid;
    }
    this.stg.grid = newGrid;
    this.stg.span.style.display = 'none';
  }

  ngOnInit() {
    this.target.setAttribute('color', this.color);
    this.target.innerHTML = `${this.left}`;
  }

  ionViewDidEnter() {
    this.parent = document.querySelector('div#one-by-one-aspect-ratio');
    this.rect = this.parent.getBoundingClientRect();

    if (this.rect.height === 0) {setTimeout(() => {
      this.parent = document.querySelector('div#one-by-one-aspect-ratio');
      this.onResize();
    }, 500);}

    this.stgParameter = {
      start: new Vector2dCssUnit(0.1 * this.rect.width, 0.1 * this.rect.height, 'px', 'px'),
      blankSpace: {length: 0.08 * this.rect.width, unit: 'px'},
      quantity: new Vector2d(10, 10)
    };
    this.stg = new StadiumInGrid(this.stgParameter);

    // hide span, then put it in the body
    this.stg.span.style.display = 'none';
    this.parent.appendChild(this.stg.span);

    this.onResize();
    this.parent.addEventListener('pointermove', (evt) => {this.onPointerMove(evt);});
    this.parent.addEventListener('pointerdown', (evt) => {this.onPointerDown(evt);});
    this.parent.addEventListener('pointerup', (evt) => {this.onPointerUp(evt);});
    this.parent.addEventListener('pointerout', (evt) => {this.onPointerUp(evt);});
    this.parent.addEventListener('pointercancel', (evt) => {this.onPointerUp(evt);});
  }



  private onPointerMove(evt) {
    evt.preventDefault();
    if (this.mouseIsDown) {
      this.mousePosition.end = new Vector2d(
        evt.clientX - this.rect.left,
        evt.clientY - this.rect.top
      );
      convert(this.mousePosition.end, this.stg);
      this.stg.segment = this.mousePosition;
    }
  }


  private onPointerDown(evt) {
    evt.preventDefault();
    // If it might be unintentional, return.
    if (evt.metaKey || evt.ctrlKey || evt.altKey || evt.shiftKey || Math.abs(evt.buttons % 2) !== 1) {
      return;
    }
    this.mousePosition.start = new Vector2d(
      evt.clientX - this.rect.left,
      evt.clientY - this.rect.top
    );
    for (const axis of Vector2d.axes) {
      this.mousePosition.start[axis] = Math.max(
        this.mousePosition.start[axis],
        cu(this.stg.grid.start[axis] + this.stg.grid.start.units[axis], null)
      );
      this.mousePosition.start[axis] = Math.min(
        this.mousePosition.start[axis],
        cu(this.stg.grid.start[axis] + this.stg.grid.start.units[axis], null)
        + cu(
          this.stg.grid.blankSpace.length * this.stg.grid.quantity[axis]
          + this.stg.grid.blankSpace.unit, null
        )
      );
    }
    convert(this.mousePosition.start, this.stg);
    this.mousePosition.end = this.mousePosition.start.copy();
    this.stg.segment = this.mousePosition;
    this.mouseIsDown = true;
    this.stg.span.style.display = '';
  }


  private onPointerUp(evt) {
    evt.preventDefault();
    if (!this.mouseIsDown) {
      return;
    }
    this.stg.segment = this.mousePosition;
    for (const [index, seg] of this.answer.entries()) {
      if (!this.answered.has(index)) {
        if (seg.equals(this.stg.segment.reversed)) {
          this.stg.segment = this.stg.segment.reversed;
        }
        if (seg.equals(this.stg.segment)) {
          this.answered.add(index);
          this.stg.setCorrect();
          this.oldStgs.push(this.stg);
          this.stg = new StadiumInGrid(this.stgParameter);

          const color = this.left === 0 ? 'success' : 'danger';
          const target = document.querySelector('ion-badge');
          target.setAttribute('color', color);
          target.innerHTML = `${this.left}`;

          // Are we done?
          if (this.left) {
            // No, we are not done
            this.stg.span.style.display = 'none';
            this.parent.appendChild(this.stg.span);
          } else {
            this.alertController.create({
              header: 'Zorionak!',
              message: 'Irabazi duzuuu!!!!',
              buttons: ['Jai, jai!', 'OK.']
            })
              .then(
                iEndAlert => Promise.all([iEndAlert.present(), iEndAlert.onDidDismiss()])
              )
              .then(() => this.route.navigate(['/']));

          }
          break;
        }
      }
    }
    this.stg.span.style.display = 'none';
    this.mouseIsDown = false;
  }

}

const convert = (rawEnd: Vector2d, stg: StadiumInGrid) => {
  for (const axis of Vector2d.axes) {
    rawEnd[axis] -= cu(stg.grid.start[axis] + stg.grid.start.units[axis], null);
    rawEnd[axis] /= cu(stg.grid.blankSpace.length + stg.grid.blankSpace.unit, null);
    rawEnd[axis] = Math.round(rawEnd[axis]);
  }
  return rawEnd;
};
