import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

type Piece = { index: number, id: number, misplaced: boolean, path: string };

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.page.html',
  styleUrls: ['./puzzle-game.page.scss'],
})
export class PuzzleGamePage implements OnInit {
  readonly rows: number = 3;
  readonly columns: number = 3;
  readonly piecesTotal: number = this.rows * this.columns;
  over: boolean = false;
  pieces: Array<Piece> = [];

  constructor(public alertController: AlertController, private route: Router) { }

  ngOnInit() {
    this.reset();
  }

  private reset(): void {
    this.shufflePieces();
    while (this.numberOfPiecesInPlace > 0){
      this.shufflePieces();
    }
  }

  private get numberOfPiecesInPlace(): number {
    return this.pieces.reduce((inPlace, piece, i) => {
      return (piece.id === i) ? inPlace + 1 : inPlace
    }, 0)
  }

  private shufflePieces(): void {
    let pieces: Array<Piece> = new Array(this.piecesTotal);
    let random: number;
    let visited: Array<number> = [];
    let path: string = '';

    for (let i = 0; i < this.piecesTotal; i++) {
      random = Math.floor(Math.random() * this.piecesTotal);
      while (visited.indexOf(random) !== -1) {
        random = Math.floor(Math.random() * this.piecesTotal);
      }
      visited.push(random);
      path = `../assets/img/puzzle/${random}.jpg`;
      pieces[i] = { index: i, id: random, misplaced: true, path };
    }
    this.pieces = pieces;
  }

  private isOver(): boolean {
    this.over = this.numberOfPiecesInPlace === this.piecesTotal;
    return this.over;
  }

  private swap(dragged: Piece, dropped: Piece, field: string): void {
    let temp: string = dragged[field];
    dragged[field] = dropped[field];
    dropped[field] = temp;
  }

  private swapPieces(dragged: Piece, dropped: Piece): void {
    this.swap(dragged, dropped, 'id');
    this.swap(dragged, dropped, 'path');
  }

  private misplacedCheck(piece: Piece): void {
    piece.misplaced = !(piece.id === piece.index);
  }

  private misplacedPiecesCheck(dragged: Piece, dropped: Piece): void {
    this.misplacedCheck(dragged);
    this.misplacedCheck(dropped);
  }

  private dragAndDrop(dragged: Piece, dropped: Piece): void {
    if (!this.isOver() && dragged !== dropped){
      this.swapPieces(dragged, dropped);
      this.misplacedPiecesCheck(dragged, dropped);
      this.over = this.isOver()
    }
    if(this.isOver()){
      setTimeout(() => {this.presentAlertConfirm()}, 500) 
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

  onDrag(ev): void {
    ev.dataTransfer.setData("index", ev.target.id);
  }

  onDrop(ev): void {
      ev.preventDefault();
      this.dragAndDrop(this.pieces[ev.dataTransfer.getData("index")], this.pieces[ev.target.id]);
  }

  onDragOver(ev): void {
    ev.preventDefault();
  }
}
