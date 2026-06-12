import { Question } from './types';

export const QUESTIONS_POOL: Question[] = [
  // ================= PENSAR + INFINITIVO =================
  {
    id: 'p1',
    tense: 'pensar_inf',
    armenianSentence: 'Ես մտադիր եմ այսօր ֆուտբոլ խաղալ:',
    spanishSentence: 'Pienso jugar al fútbol hoy.',
    options: [
      'Pienso jugar al fútbol hoy.',
      'Pienso juego al fútbol hoy.',
      'Pensamos jugar al fútbol hoy.',
      'Voy a jugar al fútbol hoy.'
    ],
    correctOption: 'Pienso jugar al fútbol hoy.',
    explanationArm: '«Pensar + infinitivo» (մտադիր լինել) կառույցում «pensar»-ը խոնարհում ենք ըստ դեմքի, իսկ հաջորդ բայը թողնում ենք անորոշ ձևով (jugar): Ես դեմքի համար (Yo) «pensar»-ը դառնում է «pienso» (e -> ie):',
    explanationSp: 'Yo pienso + jugar (infinitivo).'
  },
  {
    id: 'p2',
    tense: 'pensar_inf',
    armenianSentence: 'Դու մտադի՞ր ես գիրք կարդալ վաղը:',
    spanishSentence: '¿Piensas leer un libro mañana?',
    options: [
      '¿Piensas leer un libro mañana?',
      '¿Piensas lees un libro mañana?',
      '¿Pensas leer un libro mañana?',
      '¿Vas a leer un libro mañana?'
    ],
    correctOption: '¿Piensas leer un libro mañana?',
    explanationArm: 'Դու դեմքի համար (Tú) «pensar» բայը խոնարհվում է «piensas» (e -> ie), իսկ երկրորդ բայը մնում է անորոշ դերբայ (leer):',
    explanationSp: 'Tú piensas + leer (infinitivo).'
  },
  {
    id: 'p3',
    tense: 'pensar_inf',
    armenianSentence: 'Աննան մտադիր է պիցցա ուտել այսօր:',
    spanishSentence: 'Anna piensa comer pizza hoy.',
    options: [
      'Anna piensa comer pizza hoy.',
      'Anna pienso comer pizza hoy.',
      'Anna piensa come pizza hoy.',
      'Anna va a comer pizza hoy.'
    ],
    correctOption: 'Anna piensa comer pizza hoy.',
    explanationArm: 'Նա դեմքի համար (Él/Ella/Usted) «pensar»-ը դառնում է «piensa» (e -> ie): Հաջորդ բայը պետք է լինի անփոփոխ (comer):',
    explanationSp: 'Ella piensa + comer (infinitivo).'
  },
  {
    id: 'p4',
    tense: 'pensar_inf',
    armenianSentence: 'Մենք մտադիր ենք կինո դիտել երեկոյան:',
    spanishSentence: 'Pensamos ver una película por la tarde.',
    options: [
      'Pensamos ver una película por la tarde.',
      'Piensamos ver una película por la tarde.',
      'Pensamos vemos una película por la tarde.',
      'Vamos a ver una película por la tarde.'
    ],
    correctOption: 'Pensamos ver una película por la tarde.',
    explanationArm: 'Մենք դեմքի համար (Nosotros) «pensar»-ը դառնում է «pensamos»: Ուշադրություն՝ այս ձևում e-ն ie-ի չի փոխվում (դիֆթոնգ չկա):',
    explanationSp: 'Nosotros pensamos + ver (infinitivo).'
  },
  {
    id: 'p5',
    tense: 'pensar_inf',
    armenianSentence: 'Դուք մտադի՞ր եք երգել երեկույթին:',
    spanishSentence: '¿Pensáis cantar en la fiesta?',
    options: [
      '¿Pensáis cantar en la fiesta?',
      '¿Piensáis cantar en la fiesta?',
      '¿Pensáis cantáis en la fiesta?',
      '¿Vais a cantar en la fiesta?'
    ],
    correctOption: '¿Pensáis cantar en la fiesta?',
    explanationArm: 'Դուք դեմքի համար (Vosotros) «pensar»-ը խոնարհվում է «pensáis» (առանց դիֆթոնգի, շեշտով): Հաջորդող բայը մնում է անորոշ (cantar):',
    explanationSp: 'Vosotros pensáis + cantar (infinitivo).'
  },
  {
    id: 'p6',
    tense: 'pensar_inf',
    armenianSentence: 'Տղաները մտադիր են նոր խաղ նկարել:',
    spanishSentence: 'Los chicos piensan dibujar un juego nuevo.',
    options: [
      'Los chicos piensan dibujar un juego nuevo.',
      'Los chicos pensan dibujar un juego nuevo.',
      'Los chicos piensan dibujan un juego nuevo.',
      'Los chicos van a dibujar un juego nuevo.'
    ],
    correctOption: 'Los chicos piensan dibujar un juego nuevo.',
    explanationArm: 'Նրանք դեմքի համար (Ellos/Ellas/Ustedes) «pensar» բայը խոնարհվում է «piensan» (e -> ie):',
    explanationSp: 'Ellos piensan + dibujar (infinitivo).'
  },

  // ================= VOY / IR A + INFINITIVO =================
  {
    id: 'i1',
    tense: 'ir_a_inf',
    armenianSentence: 'Ես պատրաստվում եմ խնձոր ուտել:',
    spanishSentence: 'Voy a comer una manzana.',
    options: [
      'Voy a comer una manzana.',
      'Voy comer una manzana.',
      'Pienso comer una manzana.',
      'Fui a comer una manzana.'
    ],
    correctOption: 'Voy a comer una manzana.',
    explanationArm: '«Ir a + infinitivo» (պատրաստվել անել) կառույցում միշտ պետք է լինի «a» նախդիրը: Ես դեմքի համար (Yo) խոնարհվում է «voy a» + անորոշ բայ:',
    explanationSp: 'Yo voy a + comer (infinitivo).'
  },
  {
    id: 'i2',
    tense: 'ir_a_inf',
    armenianSentence: 'Դու պատրաստվո՞ւմ ես լողալ այսօր:',
    spanishSentence: '¿Vas a nadar hoy?',
    options: [
      '¿Vas a nadar hoy?',
      '¿Vas nadar hoy?',
      '¿Piensas nadar hoy?',
      '¿Vais a nadar hoy?'
    ],
    correctOption: '¿Vas a nadar hoy?',
    explanationArm: 'Դու դեմքի համար (Tú) «ir»-ը դառնում է «vas»: Մի՛ մոռացիր «a»-ն՝ «vas a nadar»:',
    explanationSp: 'Tú vas a + nadar (infinitivo).'
  },
  {
    id: 'i3',
    tense: 'ir_a_inf',
    armenianSentence: 'Դավիթը պատրաստվում է վազել այգում:',
    spanishSentence: 'David va a correr en el parque.',
    options: [
      'David va a correr en el parque.',
      'David va correr en el parque.',
      'David piensa correr en el parque.',
      'David iría a correr en el parque.'
    ],
    correctOption: 'David va a correr en el parque.',
    explanationArm: 'Նա դեմքի համար (Él/Ella/Usted) «ir»-ը խոնարհվում է «va»: Կառույցն է՝ «va a» + «correr»:',
    explanationSp: 'Él va a + correr (infinitivo).'
  },
  {
    id: 'i4',
    tense: 'ir_a_inf',
    armenianSentence: 'Մենք պատրաստվում ենք պարել միասին:',
    spanishSentence: 'Vamos a bailar juntos.',
    options: [
      'Vamos a bailar juntos.',
      'Vamos bailar juntos.',
      'Pensamos bailar juntos.',
      'Vais a bailar juntos.'
    ],
    correctOption: 'Vamos a bailar juntos.',
    explanationArm: 'Մենք դեմքի համար (Nosotros) «ir»-ը խոնարհվում է «vamos»: Ստացվում է՝ «vamos a bailar» (պատրաստվում ենք պարել):',
    explanationSp: 'Nosotros vamos a + bailar (infinitivo).'
  },
  {
    id: 'i5',
    tense: 'ir_a_inf',
    armenianSentence: 'Դուք պատրաստվո՞ւմ եք երաժշտություն լսել:',
    spanishSentence: '¿Vais a escuchar música?',
    options: [
      '¿Vais a escuchar música?',
      '¿Vais escuchar música?',
      '¿Vas a escuchar música?',
      '¿Pensáis escuchar música?'
    ],
    correctOption: '¿Vais a escuchar música?',
    explanationArm: 'Դուք դեմքի համար (Vosotros) «ir»-ը դառնում է «vais»: Կառույցն է՝ «vais a» + անորոշ բայ (escuchar):',
    explanationSp: 'Vosotros vais a + escuchar (infinitivo).'
  },
  {
    id: 'i6',
    tense: 'ir_a_inf',
    armenianSentence: 'Նրանք պատրաստվում են տուն գնալ շուտով:',
    spanishSentence: 'Ellos van a ir a casa pronto.',
    options: [
      'Ellos van a ir a casa pronto.',
      'Ellos van ir a casa pronto.',
      'Ellos van a casa pronto.',
      'Ellos van a irán a casa pronto.'
    ],
    correctOption: 'Ellos van a ir a casa pronto.',
    explanationArm: 'Նրանք դեմքի համար (Ellos/Ellas/Ustedes) «ir»-ը դառնում է «van»: «Գնալ» բայն է «ir», ուստի «van a ir»:',
    explanationSp: 'Ellos van a + ir (infinitivo).'
  },

  // ================= FUTURO SIMPLE =================
  {
    id: 'f1',
    tense: 'futuro_simple',
    armenianSentence: 'Ես վաղը կխաղամ իմ ընկերոջ հետ:',
    spanishSentence: 'Jugaré con mi amigo mañana.',
    options: [
      'Jugaré con mi amigo mañana.',
      'Jugaras con mi amigo mañana.',
      'Voy a jugar con mi amigo mañana.',
      'Pienso jugar con mi amigo mañana.'
    ],
    correctOption: 'Jugaré con mi amigo mañana.',
    explanationArm: 'Futuro Simple-ում կանոնավոր բայերի համար վերջավորությունները ավելանում են անորոշ դերբային (infinitiv): Yo (ես) դեմքի վերջավորությունն է «-é»՝ «jugaré» (կխաղամ):',
    explanationSp: 'Yo -> jugar + é = jugaré.'
  },
  {
    id: 'f2',
    tense: 'futuro_simple',
    armenianSentence: 'Դու վաղը հաց կուտե՞ս:',
    spanishSentence: '¿Comerás pan mañana?',
    options: [
      '¿Comerás pan mañana?',
      '¿Comeré pan mañana?',
      '¿Comeras pan mañana?',
      '¿Vas a comer pan mañana?'
    ],
    correctOption: '¿Comerás pan mañana?',
    explanationArm: 'Tú (դու) դեմքի վերջավորությունը Futuro Simple-ում «-ás» է: Բոլոր վերջավորությունները բացի nosotros-ից ունենում են շեշտ (tilde):',
    explanationSp: 'Tú -> comer + ás = comerás.'
  },
  {
    id: 'f3',
    tense: 'futuro_simple',
    armenianSentence: 'Նա նոր շուն կունենա հաջորդ շաբաթ:',
    spanishSentence: 'Él tendrá un perro nuevo la próxima semana.',
    options: [
      'Él tendrá un perro nuevo la próxima semana.',
      'Él tenerá un perro nuevo la próxima semana.',
      'Él tendrá un perro nuevo las próximas semanas.',
      'Él tiene un perro nuevo la próxima semana.'
    ],
    correctOption: 'Él tendrá un perro nuevo la próxima semana.',
    explanationArm: '«Tener» (ունենալ) բայը Futuro Simple-ում անկանոն է: Դրա արմատը դառնում է «tendr-»: Երրորդ դեմքի (Él/Ella/Usted) վերջավորությունն է «-á»՝ «tendrá» (կունենա):',
    explanationSp: 'Tener -> tendr- + á = tendrá.'
  },
  {
    id: 'f4',
    tense: 'futuro_simple',
    armenianSentence: 'Մենք վաղը կխաղանք այգում:',
    spanishSentence: 'Jugaremos en el parque mañana.',
    options: [
      'Jugaremos en el parque mañana.',
      'Jugáremos en el parque mañana.',
      'Jugaremos en el parque mañanas.',
      'Vamos a jugar en el parque mañana.'
    ],
    correctOption: 'Jugaremos en el parque mañana.',
    explanationArm: 'Մենք դեմքի համար (Nosotros) Futuro Simple-ի վերջավորությունն է «-emos» (առանց շեշտի): «Jugar»-ին ավելանում է «-emos»՝ «jugaremos»:',
    explanationSp: 'Nosotros -> jugar + emos = jugaremos.'
  },
  {
    id: 'f5',
    tense: 'futuro_simple',
    armenianSentence: 'Դուք վաղը կանե՞ք ձեր տնային աշխատանքը:',
    spanishSentence: '¿Haréis vuestra tarea mañana?',
    options: [
      '¿Haréis vuestra tarea mañana?',
      '¿Haceréis vuestra tarea mañana?',
      '¿Haréis nuestra tarea mañana?',
      '¿Haráis vuestra tarea mañana?'
    ],
    correctOption: '¿Haréis vuestra tarea mañana?',
    explanationArm: '«Hacer» (անել) բայը Futuro Simple-ում անկանոն է, արմատը փոխվում է «har-»-ի: Vosotros-ի (դուք) համար վերջավորությունն է «-éis»՝ «haréis» (կանեք):',
    explanationSp: 'Hacer -> har- + éis = haréis.'
  },
  {
    id: 'f6',
    tense: 'futuro_simple',
    armenianSentence: 'Նրանք վաղը կգան մեր դպրոց:',
    spanishSentence: 'Ellos vendrán a nuestra escuela mañana.',
    options: [
      'Ellos vendrán a nuestra escuela mañana.',
      'Ellos venirán a nuestra escuela mañana.',
      'Ellos vendrán a vuestra escuela mañana.',
      'Ellos van a venir a nuestra escuela mañana.'
    ],
    correctOption: 'Ellos vendrán a nuestra escuela mañana.',
    explanationArm: '«Venir» (գալ) բայը Futuro Simple-ում անկանոն է: Դրա արմատը դառնում է «vendr-»: Նրանք դեմքի (Ellos/Ellas/Ustedes) վերջավորությունն է «-án»՝ «vendrán» (կգան):',
    explanationSp: 'Venir -> vendr- + án = vendrán.'
  },

  // ================= FUTURO PERFECTO =================
  {
    id: 'fp1',
    tense: 'futuro_perfecto',
    armenianSentence: 'Մինչև վաղը ես արդեն կանեմ իմ տնային աշխատանքը:',
    spanishSentence: 'Para mañana ya habré hecho mi tarea.',
    options: [
      'Para mañana ya habré hecho mi tarea.',
      'Para mañana ya habré hacido mi tarea.',
      'Para mañana ya habré haciendo mi tarea.',
      'Para mañana ya he hecho mi tarea.'
    ],
    correctOption: 'Para mañana ya habré hecho mi tarea.',
    explanationArm: 'Futuro Perfecto-ն կազմվում է «Haber» բայի ապագա ձևով (Yo habré) + հիմնական բայի դերբայով (Participio): Hacer-ի դերբայն անկանոն է՝ «hecho» (կատարած/արած):',
    explanationSp: 'Yo habré + hecho (participio).'
  },
  {
    id: 'fp2',
    tense: 'futuro_perfecto',
    armenianSentence: 'Մինչև ժամը հինգը դու արդեն կկարդա՞ս այս գիրքը:',
    spanishSentence: '¿Para las cinco ya habrás leído este libro?',
    options: [
      '¿Para las cinco ya habrás leído este libro?',
      '¿Para las cinco ya habrás leido este libro?',
      '¿Para las cinco ya habrás leyendo este libro?',
      '¿Para las cinco ya leerás este libro?'
    ],
    correctOption: '¿Para las cinco ya habrás leído este libro?',
    explanationArm: 'Tú (դու) դեմքի համար Haber բայը ապագայում դառնում է «habrás»: Leer-ի դերբայը «leído» է (գրվում է շեշտով):',
    explanationSp: 'Tú habrás + leído (participio).'
  },
  {
    id: 'fp3',
    tense: 'futuro_perfecto',
    armenianSentence: 'Մինչև երեկո նա արդեն կգրի նախադասությունը:',
    spanishSentence: 'Para la tarde él ya habrá escrito la frase.',
    options: [
      'Para la tarde él ya habrá escrito la frase.',
      'Para la tarde él ya habrá escribido la frase.',
      'Para la tarde él ya habrá escribiendo la frase.',
      'Para la tarde él ya escribirá la frase.'
    ],
    correctOption: 'Para la tarde él ya habrá escrito la frase.',
    explanationArm: 'Él (Él/Ella/Usted) դեմքի համար Haber-ը դառնում է «habrá»: «Escribir» բայի դերբայն անկանոն է՝ «escrito» (գրած):',
    explanationSp: 'Él habrá + escrito (participio) la frase.'
  },
  {
    id: 'fp4',
    tense: 'futuro_perfecto',
    armenianSentence: 'Մինչև վաղը մենք արդեն կավարտենք այս խաղը:',
    spanishSentence: 'Para mañana ya habremos terminado este juego.',
    options: [
      'Para mañana ya habremos terminado este juego.',
      'Para mañana ya habremos terminando este juego.',
      'Para mañana ya terminaremos este juego.',
      'Para mañana ya habríamos terminado este juego.'
    ],
    correctOption: 'Para mañana ya habremos terminado este juego.',
    explanationArm: 'Nosotros (մենք) դեմքի համար Haber բայը դառնում է «habremos»: Terminar բայի դերբայը կանոնավոր է՝ «terminado» (ավարտած):',
    explanationSp: 'Nosotros habremos + terminado (participio).'
  },
  {
    id: 'fp5',
    tense: 'futuro_perfecto',
    armenianSentence: 'Մինչև երեքշաբթի նրանք արդեն կտեսնեն նոր ֆիլմը:',
    spanishSentence: 'Para el martes ellos ya habrán visto la película nueva.',
    options: [
      'Para el martes ellos ya habrán visto la película nueva.',
      'Para el martes ellos ya habrán verido la película nueva.',
      'Para el martes ellos ya habrán viendo la película nueva.',
      'Para el martes ellos ya verán la película nueva.'
    ],
    correctOption: 'Para el martes ellos ya habrán visto la película nueva.',
    explanationArm: 'Ellos (Ellos/Ellas/Ustedes) դեմքի համար Haber բայը դառնում է «habrán»: «Ver» (տեսնել) բայի դերբայն անկանոն է՝ «visto» (տեսած):',
    explanationSp: 'Ellos habrán + visto (participio).'
  },
  {
    id: 'fp6',
    tense: 'futuro_perfecto',
    armenianSentence: 'Մինչև ժամը վեցը դուք արդեն կտեղադրե՞ք խաղալիքները տուփի մեջ:',
    spanishSentence: '¿Para las seis ya habréis puesto los juguetes en la caja?',
    options: [
      '¿Para las seis ya habréis puesto los juguetes en la caja?',
      '¿Para las seis ya habréis ponido los juguetes en la caja?',
      '¿Para las seis ya habréis poniendo los juguetes en la caja?',
      '¿Para las seis ya pondréis los juguetes en la caja?'
    ],
    correctOption: '¿Para las seis ya habréis puesto los juguetes en la caja?',
    explanationArm: 'Vosotros (դուք) դեմքի համար Haber բայը դառնում է «habréis»: Poner բայի դերբայն անկանոն է՝ «puesto» (դրած/տեղադրած):',
    explanationSp: 'Vosotros habréis + puesto (participio).'
  }
];
