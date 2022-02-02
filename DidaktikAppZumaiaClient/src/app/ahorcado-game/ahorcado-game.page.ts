import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
// Importación necesaria para mensajes flash.
import { ToastController } from '@ionic/angular';
// Importación necesaria para alerts.
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ahorcado-game',
  templateUrl: './ahorcado-game.page.html',
  styleUrls: ['./ahorcado-game.page.scss'],
})
export class AhorcadoGamePage implements OnInit {
// Definimos las variables
letra: string = '';
nombres: any = ['SANTIAGOKOKATEDRALA'];
nombreSecreto: any = this.palabraAleatoria(0, (this.nombres.length - 1));
palabra: any = '';
muestraHuecos: any = this.muestraHuecosPalabra();
mensaje: string = '';
letras_utilizadas: string = '';
nombresecretomostrar: string = '';

vidas: number = 6;
puntos: number = 0;
ganador: number = 0;
imagen: number = 1;

durationMessages: number = 3000;

// Creamos un array para guardar las letras que se van seleccionando.
controlLetras = new Array;

constructor(public navCtrl: NavController, 
      private toastCtrl: ToastController,
      public alertCtrl: AlertController) {  }

// Método que valida la letra seleccionada.	
public async compruebaLetra() {
    // Formateamos a mayúsculas para mejorar la legibilidad.
    let letraMayusculas = this.letra.toUpperCase();
    
    // Si se ha seleccionado una letra...		
    if (letraMayusculas) {

      if (this.controlLetras.indexOf(letraMayusculas) == -1) {
      
        // Recorremos las letras de la palabra (array), para detectar si la letra se encuentra en ella.
          if (this.nombreSecreto.indexOf(letraMayusculas) != -1) {

            let nombreSecretoModificado = this.nombreSecreto;
          let posicion = new Array;
          let posicionTotal = 0;

          let contador = 1;

          while (nombreSecretoModificado.indexOf(letraMayusculas) != -1) {
              
          posicion[contador] = nombreSecretoModificado.indexOf(letraMayusculas);
              nombreSecretoModificado = nombreSecretoModificado.substring(nombreSecretoModificado.indexOf(letraMayusculas) + letraMayusculas.length, nombreSecretoModificado.length);

          // Calculamos la posición total.
          if (contador > 1) {
              posicionTotal = posicionTotal + posicion[contador] + 1;
            }
          else { 
              posicionTotal = posicionTotal + posicion[contador];
          }

          // Preparamos la palabra para que sea mostrara en modal de solución directa.
          this.palabra[posicionTotal] = letraMayusculas;

                  // Sumamos puntos
          if (this.controlLetras.indexOf(letraMayusculas) == -1) {
              this.puntos = this.puntos + 10;

              // Hacemos uso de Toast Controller para lanzar mensajes flash.
              let toast = await this.toastCtrl.create({
                message: 'Primeran,' + letraMayusculas + ' letra hitz sekretuan dago.',
                duration: this.durationMessages,
                cssClass: 'toast-success',
                position: 'top'
              });
              toast.present();
          }

                  contador++;

                  // Si ya no quedan huecos, mostramos el mensaje para el ganador.
          if (this.palabra.indexOf('_') == -1) { 

              // Sumamos puntos
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
            this.puntos = this.puntos + 50;
              }

              // Damos el juego por finalizado, el jugador gana.
              this.finDelJuego('gana')					
          }
            }
        }
          else {
              // Restamos una vida.
          this.nuevoFallo();
          // Actualizamos la imagen
          this.nuevaImagen(this.imagen);

          // Comprobamos si nos queda alguna vida.
          if (this.vidas > 0) {

              // Restamos puntos siempre y cuando no sean 0.
          if (this.puntos > 0) { 
              if (this.controlLetras.indexOf(letraMayusculas) == -1) {
              this.puntos = this.puntos - 5;
              }
          }

          // Mostramos un mensaje indicando el fallo.	
            let toast = await this.toastCtrl.create({
              message: 'Akatsa, ' + letraMayusculas + '  letra ez dago hitz sekretuan. Gogoratu geratzen zaizkizula ' + this.vidas + ' bizitzak.',
              duration: this.durationMessages,
              cssClass: 'toast-danger',
              position: 'top'
            });
          toast.present();				
        }
          else { 
          // Damos el juego por finalizado, el jugador pierde.
          this.finDelJuego('pierde')
          }
          }

          // Array de letras utilizadas para mostrar al jugador.
          if(this.letras_utilizadas == ''){
        this.letras_utilizadas += letraMayusculas;
      }
      else{
        this.letras_utilizadas += ' - '+letraMayusculas;
      }

      // Añadimos al array de letras la nueva letra seleccionada.
      this.controlLetras.push(letraMayusculas);
      }
      else{
      // En caso de que la letra ya hubiera sido seleccionada, mostramos un mensaje.
        let toast = await this.toastCtrl.create({
          message:  letraMayusculas + ' A letra aurretik hautatu zen. Mesedez, aukeratu beste letra bat.',
          duration: this.durationMessages,
          cssClass: 'toast-warning',
          position: 'top'
        }); 
        toast.present();
    }

  }
}

public muestraHuecosPalabra() {
    let totalHuecos = this.nombreSecreto.length;

    // Declaramos la variable huecos como nuevo array.		
    let huecos = new Array;
    for (let i = 0; i < totalHuecos; i++) {
    //Asignamos tantos huecos como letras tenga la palabra.
    huecos.push('_');
    }

    // Para empezar formamos la variable palabra tan solo con los huecos, ya que en este momento aún no se ha seleccionado ninguna letra.	
    this.palabra = huecos;
    return this.palabra;
}

  // Método que genera una palabra aleatoria comprendida en el array nombres.	
public palabraAleatoria(primer, ultimo) {
    let numberOfName = Math.round(Math.random() * (ultimo - primer) + (primer));
    return this.nombres[numberOfName];
}

public nuevoFallo() {
    this.vidas = this.vidas - 1;
    return this.vidas;
}

public nuevaImagen(imagen) {
    this.imagen = imagen + 1;
    return this.imagen;
}

public confirmarResolver(){
  this.showPrompt();
}

public async showPrompt() {
  const prompt = this.alertCtrl.create({
    header: 'Zuzeneko irtenbidea',
      message: "Ziur zaude isilpeko hitza zuzenean ebazteaz?",
      inputs: [
      {
          name: 'palabraSolucion',
          id: 'palabraSolucion',
          placeholder: this.palabra
      },
      ],
      buttons: [
      {
          text: 'Deuseztatu',
          handler: data => {
            // Se cierra ventana.
          }
      },
      {
          text: 'Erabaki',
          handler: data => {
            // Llamamos a método que compara la palabra secreta con la insertada mediante teclado.
            // var solucion = this.palabra.toString();
            // var solucion = solucion.replace(/,/g, '');
        var solucion = ((document.getElementById("palabraSolucion") as HTMLInputElement).value);
            this.resolver(solucion);
          }
      }]
  });
  (await prompt).present();
}

public async showConfirm(accion) {

  // Resolver
  if(accion == 'Erabaki'){
    const confirm = await this.alertCtrl.create({
      header: 'Zuzeneko irtenbidea',
      message: 'Ziur zaude isilpeko hitza zuzenean ebazteaz?',
      buttons: [
        {
          text: 'Ezeztatu',
          handler: () => {
            //
          }
        },
        {
          text: 'Egiaztatu',
          handler: () => {
            //
          }
        }
      ]
    });
    confirm.present();
  }
    
}

public async resolver(solucion){
  // Comprobamos la solución directa.

  if(this.nombreSecreto == solucion.toUpperCase()){
    var totalOcultas = 0;
    // Recorremos el array para detectar huecos sin transformar a letras.
    for ( var i = 0; i < this.palabra.length; i++ ) {
          if(this.palabra[i] == '_'){
            totalOcultas = totalOcultas + 1;
          }
      }

      // ACIERTO :: Sumamos +50 y + 20 por cada hueco sin desvelar.
      this.puntos = this.puntos + 50 + (20 * totalOcultas);
    
    this.finDelJuego('gana')

    // Colocamos la palabra secreta en el
  }else{
    // ERROR :: RESTAMOS 50.
    this.puntos = this.puntos - 25;

    let toast = await this.toastCtrl.create({
      message: 'Sentitzen dugu! ' + solucion + 'hitza ez da hitz sekretua. Zure akatsak 25 puntu kentzen dizkizu.',
      duration: this.durationMessages,
      cssClass: 'toast-danger',
      position: 'top'
    });
    toast.present();
  }


}

public async finDelJuego(valor) { 
    // Perdedor
    if (valor == 'pierde') {

      this.ganador = 0;

    // Mostramos el mensaje como que el juego ha terminado
      let toast = await this.toastCtrl.create({
        message: 'Galdu egin duzu, saiatu berriro. Guztira ' + this.puntos + ' puntu lortu dituzu. Isilpeko hitza ' + this.nombreSecreto+' da',
        duration: this.durationMessages,
        cssClass: 'toast-danger',
        position: 'top'
      });
    toast.present();
  }

    // Ganador
    if (valor == 'gana') { 

      this.ganador = 1;

      let toast = await this.toastCtrl.create({
        message: 'Zorionak! Asmatu duzu isilpeko hitza. Guztira ' + this.puntos + ' puntu lortu dituzu.',
        duration: this.durationMessages,
        cssClass: 'toast-success',
        position: 'top'
      });
    toast.present();
    }		
}

public reiniciaJuego() { 
    this.letra = '';
    this.palabra = '';
    this.vidas = 6;
    this.mensaje = '';
    this.ganador = 0;
    this.puntos = 0;
    this.nombreSecreto = this.palabraAleatoria(0, (this.nombres.length-1));
    this.muestraHuecos = this.muestraHuecosPalabra();
    this.imagen = 1;
    this.letras_utilizadas = '';
   this.nombresecretomostrar = '';
   this.controlLetras = new Array;
}

  ngOnInit() {
  }

}
