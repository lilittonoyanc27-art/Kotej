import React from 'react';
import { BookOpen, GraduationCap, Clock, AlertCircle } from 'lucide-react';

interface GrammarGuideProps {
  onBack?: () => void;
}

export const GrammarGuide: React.FC<GrammarGuideProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/90 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-2xl animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-sans text-amber-400 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Իսպաներենի Ապառնի Ժամանակաձևերը (Tiempos de Futuro)
        </h2>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-md active:scale-95 text-sm"
            id="guide-back-btn"
          >
            Վերադառնալ Խաղին
          </button>
        )}
      </div>

      <div className="space-y-8 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
        {/* Intro */}
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Իսպաներենում ապառնի կամ ապագա գործողություններ արտահայտելու համար օգտագործվում են մի քանի տարբեր կառույցներ և ժամանակաձևեր՝ կախված գործողության մոտիկությունից, վստահության աստիճանից կամ նախնական պլանավորված լինելուց։ Այս ուղեցույցում մանրամասն ներկայացված են 4 ամենակարևոր ձևերը։
        </p>

        {/* 1. PENSAR + INFINITIVO */}
        <section className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-sm">
              1
            </span>
            <h3 className="text-lg font-bold text-indigo-300 font-sans">
              Pensar + Infinitivo (Մտադրություններ / Պլաններ)
            </h3>
          </div>
          <p className="text-sm text-slate-300 mb-4 font-sans">
            Օգտագործվում է, երբ ցանկանում ենք ասել, որ <strong className="text-white">մտադիր ենք</strong> ինչ-որ բան անել, բայց դեռ հստակ չգիտենք, թե երբ կամ ինչպես։ Սա արտահայտում է ներքին մտադրություն կամ գաղափար։
          </p>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono text-xs mb-4 text-slate-300">
            <span className="text-indigo-400">Կազմությունը` </span>
            Pensar (խոնարհված ներկա ժամանակով) + Infinitivo (բայի անորոշ ձև)
          </div>

          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Pensar բայի խոնարհումը ներկայում (ուշադրություն e → ie դիֆթոնգին):
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono mb-4 text-emerald-400">
            <div className="bg-slate-900/50 p-2 rounded">Yo <strong className="text-white">pienso</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Tú <strong className="text-white">piensas</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Él/Ella/Usted <strong className="text-white">piensa</strong></div>
            <div className="bg-slate-900/50 p-2 rounded text-amber-300">Nosotros <strong className="text-white">pensamos</strong> (չկա ie)</div>
            <div className="bg-slate-900/50 p-2 rounded text-amber-300">Vosotros <strong className="text-white">pensáis</strong> (չկա ie)</div>
            <div className="bg-slate-900/50 p-2 rounded">Ellos/Ellas/Ustedes <strong className="text-white">piensan</strong></div>
          </div>

          <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-3 rounded-r-lg text-xs md:text-sm">
            <strong className="text-emerald-400 block mb-1">Օրինակներ`</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><span className="text-white font-semibold">Pienso comprar</span> una house nueva. — <em className="text-slate-400">Մտադիր եմ նոր տուն գնել։</em></li>
              <li>¿<span className="text-white font-semibold">Pensáis viajar</span> a España? — <em className="text-slate-400">Դուք մտադի՞ր եք ճանապարհորդել Իսպանիա։</em></li>
            </ul>
          </div>
        </section>

        {/* 2. VOY / IR A + INFINITIVO */}
        <section className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-sm">
              2
            </span>
            <h3 className="text-lg font-bold text-emerald-300 font-sans">
              Ir a + Infinitivo (Մոտակա կամ Հաստատուն Ապառնի)
            </h3>
          </div>
          <p className="text-sm text-slate-300 mb-4 font-sans">
            Ամենաշատ օգտագործվող ապառնի ժամանակաձևն է։ Այն օգտագործվում է, երբ գործողությունը <strong className="text-white">պատրաստվում ենք անել հենց հիմա/շուտով</strong>, կամ այն արդեն որոշված, պլանավորված է և ունի իրականացման մեծ հավանականություն։
          </p>
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono text-xs mb-4 text-slate-300">
            <span className="text-emerald-400">Կազմությունը` </span>
            Ir (խոնարհված ներկա ժամանակով) + a + Infinitivo (անորոշ դերբայ)
          </div>

          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Ir (գնալ) բայի խոնարհումը`
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono mb-4 text-emerald-400">
            <div className="bg-slate-900/50 p-2 rounded">Yo <strong className="text-white">voy</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Tú <strong className="text-white">vas</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Él/Ella/Usted <strong className="text-white">va</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Nosotros <strong className="text-white">vamos</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Vosotros <strong className="text-white">vais</strong></div>
            <div className="bg-slate-900/50 p-2 rounded">Ellos/Ellas/Ustedes <strong className="text-white">van</strong></div>
          </div>

          <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-3 rounded-r-lg text-xs md:text-sm">
            <strong className="text-emerald-400 block mb-1">Օրինակներ`</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><span className="text-white font-semibold">Voy a pintar</span> la pared de azul. — <em className="text-slate-400">Պատրաստվում եմ պատը կապույտ ներկել։</em></li>
              <li>¿<span className="text-white font-semibold">Vas a ayudarme</span> hoy? — <em className="text-slate-400">Պատրաստվո՞ւմ ես օգնել ինձ այսօր։</em></li>
            </ul>
          </div>
        </section>

        {/* 3. FUTURO SIMPLE */}
        <section className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold text-sm">
              3
            </span>
            <h3 className="text-lg font-bold text-amber-300 font-sans">
              Futuro Simple (Պարզ Ապառնի - կանեմ / կլինի)
            </h3>
          </div>
          <p className="text-sm text-slate-300 mb-4 font-sans">
            Արտահայտում է ապագա կանխատեսումներ, խոստումներ, կամ գործողություններ հեռու ապագայում։ Հայերենում թարգմանվում է <strong className="text-white">«կանեմ, կգտնեմ»</strong> ձևերով։
          </p>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono text-xs mb-4 text-slate-300">
            <span className="text-amber-400">Կազմությունը` </span>
            Անորոշ դերբայ (Infinitivo) + Ապառնիի վերջավորություններ (միանման են -ar, -er, -ir խմբերի համար)
          </div>

          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
            Վերջավորությունները (ավելացվում են անմիջապես ամբողջական անորոշ դերբային)`
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono mb-4 text-amber-300">
            <div className="bg-slate-900/50 p-2 rounded">Yo: <strong className="text-white">-é</strong> (hablaré)</div>
            <div className="bg-slate-900/50 p-2 rounded">Tú: <strong className="text-white">-ás</strong> (hablarás)</div>
            <div className="bg-slate-900/50 p-2 rounded">Él/Ella/Usted: <strong className="text-white">-á</strong> (hablará)</div>
            <div className="bg-slate-900/50 p-2 rounded">Nosotros: <strong className="text-white">-emos</strong> (hablaremos)</div>
            <div className="bg-slate-950 p-2 rounded">Vosotros: <strong className="text-white">-éis</strong> (hablaréis)</div>
            <div className="bg-slate-900/50 p-2 rounded">Ellos/Ellas/Ustedes: <strong className="text-white">-án</strong> (hablarán)</div>
          </div>

          <div className="bg-amber-400/10 border-l-4 border-amber-400 p-3 rounded-r-lg text-xs md:text-sm mb-4">
            <strong className="text-amber-400 flex items-center gap-1 mb-1">
              <AlertCircle className="w-4 h-4" />
              Ուղղագրական անկանոնություններ (Irregular stems)
            </strong>
            <p className="text-slate-300 mb-2">
              Որոշ բայեր փոխում են իրենց հիմքն ապառնիում, բայց ստանում են նույն վերջավորությունները.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
              <div>• <strong className="text-white">Tener</strong> → tendr- (tendré, tendrás...)</div>
              <div>• <strong className="text-white">Hacer</strong> → har- (haré, harás...)</div>
              <div>• <strong className="text-white">Decir</strong> → dir- (diré, dirás...)</div>
              <div>• <strong className="text-white">Poder</strong> → podr- (podré, podrás...)</div>
              <div>• <strong className="text-white">Salir</strong> → saldr- (saldré, saldrás...)</div>
              <div>• <strong className="text-white">Venir</strong> → vendr- (vendré, vendrás...)</div>
            </div>
          </div>

          <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-3 rounded-r-lg text-xs md:text-sm">
            <strong className="text-emerald-400 block mb-1">Օրինակներ`</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><span className="text-white font-semibold">Llamaré</span> a mi padre mañana. — <em className="text-slate-400">Վաղը կզանգեմ հայրիկիս։</em></li>
              <li>Ellos <span className="text-white font-semibold">harán</span> la casa nueva. — <em className="text-slate-400">Նրանք կպատրաստեն (կկառուցեն) նոր տունը։</em></li>
            </ul>
          </div>
        </section>

        {/* 4. FUTURO PERFECTO */}
        <section className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold text-sm">
              4
            </span>
            <h3 className="text-lg font-bold text-pink-300 font-sans">
              Futuro Perfecto (Ապառնի Կատարյալ - արած կլինեմ)
            </h3>
          </div>
          <p className="text-sm text-slate-300 mb-4 font-sans">
            Արտահայտում է ապագա գործողություն, որն արդեն <strong className="text-white">ավարտված կլինի ապագայում</strong> մինչև մեկ այլ գործողության սկսվելը կամ հստակ նշված ժամը։ Հաճախ օգտագործվում է «para» (մինչև այսինչ ժամանակ) բառի հետ։
          </p>

          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono text-xs mb-4 text-slate-300">
            <span className="text-pink-400">Կազմությունը` </span>
            Haber (Futuro Simple-ով խոնարհված) + Participio (Դերբայ)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Haber future conjugates */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-805">
              <h5 className="text-xs font-mono text-pink-300 mb-2 uppercase font-bold">Haber ապագայում`</h5>
              <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                <div>habré</div>
                <div>habremos</div>
                <div>habrás</div>
                <div>habréis</div>
                <div>habrá</div>
                <div>habrán</div>
              </div>
            </div>

            {/* Participio helper */}
            <div className="bg-slate-900/40 p-3 rounded border border-slate-805">
              <h5 className="text-xs font-mono text-emerald-300 mb-2 uppercase font-bold">Participio (Դերբայ)`</h5>
              <ul className="text-xs font-mono space-y-1">
                <li>• <strong className="text-white">-ar</strong> → -ado (pintar → pintado)</li>
                <li>• <strong className="text-white">-er / -ir</strong> → -ido (comer → comido)</li>
                <li>• <strong className="text-amber-400">Անկանոններ</strong>:
                  <div className="grid grid-cols-2 gap-1 mt-1 text-[10px] text-slate-400">
                    <div>hacer → hecho</div>
                    <div>poner → puesto</div>
                    <div>escribir → escrito</div>
                    <div>ver → visto</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-3 rounded-r-lg text-xs md:text-sm">
            <strong className="text-emerald-400 block mb-1">Օրինակներ`</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Para mañana <span className="text-white font-semibold">habré terminado</span> los cimientos. — <em className="text-slate-400">Մինչև վաղը ես արդեն ավարտած կլինեմ հիմքը։</em></li>
              <li>Para julio ellos ya <span className="text-white font-semibold">habrán construido</span> el tejado. — <em className="text-slate-400">Մինչև հուլիս նրանք արդեն կառուցած կլինեն տանիքը։</em></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
