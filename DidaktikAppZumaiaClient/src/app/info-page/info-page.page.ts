import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kokapena } from '../interfaces/kokapena';
import { KokapenaService } from '../services/kokapena.service';
import { Howl } from "howler";

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.page.html',
  styleUrls: ['./info-page.page.scss'],
})
export class InfoPagePage implements OnInit {

  idKokapen: number;
  kokapenBat = {} as Kokapena;

  audio;
  kokapena: Kokapena[] = [];
  /*kokapenakLokal: Kokapena[] = [{ "IdKokapena": 1, "Latitudea": "43.290467710659314", "Longitudea": "-2.2561401900674816", "Izena": "Zumaiako Eskola", "Irudia": "http://1.bp.blogspot.com/_ydSq9IhdaV4/TKuhnXV6oFI/AAAAAAAAAOU/UKv7fzOpqeA/s1600/03_ikastetxea.jpg" },
  { "IdKokapena": 2, "Latitudea": "43.294052109835846", "Longitudea": "-2.2534043368893992", "Izena": "Aita Mari Arraun Elkartea", "Irudia": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Club_d%27aviron_Aita_Mari.jpg/640px-Club_d%27aviron_Aita_Mari.jpg" },
  { "IdKokapena": 3, "Latitudea": "43.29680669355058", "Longitudea": "-2.2584515504847835", "Izena": "Udaletxea", "Irudia": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Zumaiako_udaletxea.dd.jpg/442px-Zumaiako_udaletxea.dd.jpg" },
  { "IdKokapena": 4, "Latitudea": "43.297274264020785", "Longitudea": "-2.2560659880017853", "Izena": "Kultur-Etxea", "Irudia": "http://www.laventanadelarte.es/images/gipuzkoa/8052/centro-8052-18051810281199a5c9.jpg" },
  { "IdKokapena": 5, "Latitudea": "43.29727140817687", "Longitudea": "-2.2566796719846027", "Izena": "San Pedro Eliza", "Irudia": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Church_of_Saint_Peter_Zumaia.jpg" },
  { "IdKokapena": 6, "Latitudea": "43.298988977136695", "Longitudea": "-2.2609761829002593", "Izena": "San Telmoko Ermita", "Irudia": "https://gmdavid.com/wp-content/uploads/2020/04/ermita-de-san-telmo-lateral.jpg" },
  { "IdKokapena": 7, "Latitudea": "43.30373221093571", "Longitudea": "-2.2463313669578127", "Izena": "Zumaiako Flysch-ak", "Irudia": "https://media.traveler.es/photos/6137691c86b46eac7cf59e2c/master/w_1600%2Cc_limit/153499.jpg" }];
    testua: string;
  testuak: string[] = ["Elbira Zipitria Zumaian 1904ko maiatzaren 28an jaiotako euskara bultzatzen zuen andereñoa izan zen. Errepublika garaian klaseak ematen zituen, eta Francoren garaia heldu zenean ere klaseak ematen jarraitu zuen, baina klandestinitatean (ezkutuan). Elbira Zipitriak lehen ikastola sortu zuen Donostiako hiriburuan, \"Orixe Ikastola\" deitutakoa. Andereño moduan lan egitean, umeei gauzak irakasterakoan, metodo ezberdinak erabiltzen zituen, garairako oso aurreratuak zirenak. Adibidez, Maria Montessoriren metodoa: ikasteko leku irekiak, armairuak eta abar umeen altueran, material manipulagarria, … Elbirak euskara gogotsu bultzatzen zuen, eta euskara irakatsi zien bai umeei, bai helduei. Horrez gain, Euskaltzaleak eta Eusko Ikaskuntzako kide ere izan zen. Elbira emakume oso garrantzitsua izan zen, emakumeen aldeko borrokan aritu zelako eta emakumeek irakaskuntzan eta politikan duten papera agerian utzi zuelako.",
    "Badakizue zer da arrauna? Pentsatzen duzue arrauna kirol bat dela ala ez? \nBa bai, arrauna uretako kirola da, eta ontzi baten propultsioan datza, egurrezko pala luze eta estu batzuen bidez (arraunak). Aisialdirako izan daitekeen kirola da, non arraun teknika ikastea eta, besterik gabe, haren gozamenean zentratzea, edo lehiakorra, non atletek elkarren aurka aritzen dira. \r\nNoiz pentsatzen duzue arrauna sortu zela? Duela urte gutxi? Arrauna kirol nahiko zaharra da, duela hainbat urte sortu zen Britainia Handian, gero beste herrialdetatik zabaldu egin zen, XVII. mendean zehar sortu egin zen. Gaur egun, arrauna kirol garrantzitsua da, batez ere hemen, Euskal Herrian. Horrez gain, joko olinpikoetan egiten den kirola baita. \nOrain adibide bat jarriko dut, Aita Mari Arraun Elkartea, hau Gipuzkoako Zumaia herriko arraun talde bat da, eta arrauneko lehenengo mailan lehiatzen du, Liga ACTn.",
    "Bide honen sorrera, Erdi Arokoa da eta Santiago Nagusiaren hilobiraino joaten zirenak egiten zuten ibilbideari deritzo, Santiagoko katedralean dagoen Santiago Apostoluaren hilobiraino. Hori dela eta, hainbat bide desberdintzen dira baina historikoki Pirinioetatik abiatzen dena deritzo Done Jakue bidea. Gure herritik pasatzen dena, aldaera bat da, euskalduna.",
    "Euskal Herrian, biztanleriak jantzi oso bitxiak erabiltzen zituzten batez ere landetan eta baserrietan. Jantzi hauek, sexua, adina edo Euskal Herriko zonaldearen arabera desberdinak ziren; emakumeek, gona luzeak eta zapia buruan eramaten zuten, eta gizonek, galtza luzeak, blusoia edo alkandora, eta txapela. Bi kasuetan, abarkak edo alpargatak erabiltzen ziren. Industrializazioarekin batera, euskal jantziak erabiltzeko ohitura desagertzen joan zen, jendea landa-eremutik hirietara joaten zelako. Horregatik, antzinako garaiei omenaldi eginez, egun seinalatuetako festa edo ospakizun berezietan erabiltzen dira.",
    "Partaideak arrantzalez jantzita joaten dira, badakizue nolakoa den jantzi hori? Euskal herriko jantzi urdin tradizionala da, arrantzaleek eramaten zutena. Jai egun hau urtero dataz aldatu egiten da Aste Santuaren arabera, Pazko Igandea (arrautzak margotzen eta batzen diren eguna) baino zortzi egun geroago ospatzen da. Zergatik ospatzen da danborrada? Egun horretan San Telmo ermitari egiten zaio  prozesioa, \"San Telmo Martxa\"-rekin girotuta.",
    "Badakizu zein den Flyscharen alboan dagoen ermitaren izena? Eta badakizu zergatik bisitatzen duen hainbeste jendek? Flyscha osatzen duen itsaslabarraren gainean eta Itzurun hondartzaren gainean dagoen ermita San Telmo izena du. Bai, San Telmo, Zumaiako jaieguna bezala, San Telmo eguna. Jakingo duzu egun horretan, Pazko Igandea baino zortzi egun geroago, Zumaia herriko jendea ermitara joaten dela prozesioan, \"arrantzalez\" jantzita. Zu ere noizbait joango zinen, seguru. Ba ez da kasualitatea ermitak eta jaiegunak izen berdina izatea. San Telmo ermita txikia, marinelen patroiaren omenez egin zutelako. Badakigu ermita 1540.urtean dagoeneko eraikita zegoela, paper batzuetan ermita aipatzen delako. Hala ere, jakin behar duzu ermita erre egin zela XX.mende hasieran, sute bat egon baitzen, eta ermitaren oinarria bakarrik salbatu zen. Gero, San Telmoko Marinelen Kofradiak berritu eta berreraiki egin du, gaur egun ikusgai dagoen moduan. Azken urteetan, bisitari asko ikusi izango dituzu ermita honetan. Eta zergatik? galdeko zara. Zumaiako San Telmo ermitan pelikula oso garrantzitsu bat grabatu delako: “Ocho apellidos vascos” eta horregatik, leku ezberdinetatik pertsona asko datoz ermita ikustera.",
    "Noizbait pentsatu duzue zer den Zumaiako San Telmo ermitatik ikusten den harriz osaturiko paisai ederra? Azalpen honekin hasi aurretik, Flysch bat zer den azaldu beharra dago. Flysch bat, egitura geologiko bat da. Hau da, denboraren poderioz,  harri geruzen bitartez sortzen joan den paisai zoragarria. Aipatzekoa da, harri mantu horietan, gure planetaren istorioaren 60 milioi urteei buruzko informazioa gordetzen dela. Informazio hori fosiletan irudikatuta dago. Fosilak, arroketan kontserbatuta geratu ziren organismo bizien hondarrak dira. Beraz, denbora pasa ahala arroketan garai hartan bizi ziren izakien gorputzak grabatuta gelditzen dira. Zumaiako flysch-a, dinosauroek desagertu zirenetik existitzen da, horregatik kontserbatu behar dugun paisaia da, garai hartako informazioa eskuratzen laguntzen gaituen egitura geologikoa delako, erabat guztion eskuan dagoena.",
  ]*/

  constructor(private route: ActivatedRoute, private router: Router, private kokapenaService: KokapenaService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.idKokapen) {
        this.idKokapen = params.idKokapen;
        this.kokapenaService.getKokapena(this.idKokapen)
          .subscribe(data => {
            this.kokapenBat = data;
            this.audio = new Howl({src: ['assets/audio/kokapen-' + this.idKokapen + '.mp3']})
            this.audio.play();
          }, error => console.log('Error :: ' + error));
        /*this.kokapenBat = this.kokapenakLokal[this.idKokapen - 1];
        this.testua = this.testuak[this.idKokapen - 1];*/
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.audio.pause();
  }

  jokoaZabaldu() {
    var ruta = '';
    switch (this.idKokapen.toString()) {
      case '1':
        ruta = '/puzzle-game'
        break;
      case '2':
        ruta = '/memory-game'
        break;
      case '3':
        ruta = '/ahorcado-game'
        break;
      case '4':
        ruta = '/jantziak-game'
        break;
      case '5':
        ruta = '/drum-game'
        break;
      case '6':
        ruta = '/asmakizuna'
        break;
      case '7':
        ruta = '/word-search-game'
        break;
    }
    this.audio.pause();
    this.router.navigate([ruta]);
  }

}
