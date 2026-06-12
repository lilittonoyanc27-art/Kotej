import React, { useState, useEffect, useRef } from 'react';
import { GameState, Question, CottageStage, PlayerState } from './types';
import { QUESTIONS_POOL } from './questions';
import { Cottage3D } from './Cottage3D';
import { GrammarGuide } from './GrammarGuide';
import { 
  Trophy, 
  Users, 
  RotateCcw, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  FileText,
  Volume2,
  VolumeX,
  Clock,
  Sparkles
} from 'lucide-react';

// Custom SFX Synthesizer using Web Audio API (cross-browser, offline-safe)
class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    // Quick double chime
    const playNote = (freq: number, delay: number, dur: number) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gain.gain.setValueAtTime(0.08, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      
      osc.start(now + delay);
      osc.stop(now + delay + dur);
    };

    playNote(523.25, 0, 0.15); // C5
    playNote(659.25, 0.08, 0.25); // E5
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C arpeggio
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  }
}

const sfx = new SoundEffects();

export default function App() {
  // Game States
  const [gameState, setGameState] = useState<GameState>({
    player1: { name: 'Խաղացող 1', stage: 0, score: 0, combo: 0, correctAnswers: 0, totalAnswers: 0 },
    player2: { name: 'Խաղացող 2', stage: 0, score: 0, combo: 0, correctAnswers: 0, totalAnswers: 0 },
    currentPlayer: 1,
    currentQuestion: null,
    gameStatus: 'lobby',
    winner: null,
    history: []
  });

  // App-level configuration
  const [player1Input, setPlayer1Input] = useState('Խաղացող 1');
  const [player2Input, setPlayer2Input] = useState('Խաղացող 2');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerCount, setTimerCount] = useState<number>(20);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync volume state with synthesizer class
  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Turn-timer ticks (Disabled per user request for untimed gameplay)
  useEffect(() => {
    // No timer limit or ticking
  }, []);

  // Get a random question that has not been asked yet in the current game
  const selectNextQuestion = (historyList: any[]): Question => {
    // Extract IDs of all questions already asked in this game
    const askedIds = historyList.map(h => h.question.id);
    const available = QUESTIONS_POOL.filter(q => !askedIds.includes(q.id));
    
    // Fallback to full pool only if ALL questions were already asked
    const finalPool = available.length > 0 ? available : QUESTIONS_POOL;
    const index = Math.floor(Math.random() * finalPool.length);
    return finalPool[index];
  };

  const startNewGame = () => {
    sfx.playClick();
    const firstQuestion = selectNextQuestion([]);
    setGameState({
      player1: { name: player1Input || 'Խաղացող 1', stage: 0, score: 0, combo: 0, correctAnswers: 0, totalAnswers: 0 },
      player2: { name: player2Input || 'Խաղացող 2', stage: 0, score: 0, combo: 0, correctAnswers: 0, totalAnswers: 0 },
      currentPlayer: 1,
      currentQuestion: firstQuestion,
      gameStatus: 'playing',
      winner: null,
      history: []
    });
    setTimerCount(20);
    setIsAnswered(false);
    setSelectedOption(null);
    setFeedback(null);
  };

  const handleTimeOut = () => {
    // Treat timeout as an incorrect answer
    const activePlayerNum = gameState.currentPlayer;
    const activePlayer = activePlayerNum === 1 ? gameState.player1 : gameState.player2;
    const currentQ = gameState.currentQuestion;
    
    if (!currentQ) return;

    sfx.playWrong();
    setIsAnswered(true);
    setSelectedOption('ԺԱՄԱՆԱԿՆ ԱՎԱՐՏՎԵՑ (TIMEOUT)');
    
    setFeedback({
      isCorrect: false,
      show: true
    });

    const updatedPlayer: PlayerState = {
      ...activePlayer,
      combo: 0,
      totalAnswers: activePlayer.totalAnswers + 1
    };

    setGameState((prev) => ({
      ...prev,
      player1: activePlayerNum === 1 ? updatedPlayer : prev.player1,
      player2: activePlayerNum === 2 ? updatedPlayer : prev.player2,
      history: [
        ...prev.history,
        {
          player: activePlayerNum,
          question: currentQ,
          wasCorrect: false,
          userAnswer: 'Ժամանակն ավարտվեց'
        }
      ]
    }));
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered || feedback?.show) return;
    sfx.playClick();
    
    const activePlayerNum = gameState.currentPlayer;
    const activePlayer = activePlayerNum === 1 ? gameState.player1 : gameState.player2;
    const currentQ = gameState.currentQuestion;
    if (!currentQ) return;

    setIsAnswered(true);
    setSelectedOption(option);
    
    const wasCorrect = option === currentQ.correctOption;
    
    if (wasCorrect) {
      sfx.playCorrect();
    } else {
      sfx.playWrong();
    }

    setFeedback({
      isCorrect: wasCorrect,
      show: true
    });

    // Calculate score & stage advancement
    let nextStage = activePlayer.stage;
    let scoreAddition = 10;
    let nextCombo = activePlayer.combo;

    if (wasCorrect) {
      // Correct answer builds 1 step
      nextStage = Math.min(8, activePlayer.stage + 1) as CottageStage;
      nextCombo = activePlayer.combo + 1;
      
      // Combo modifiers: streak gives extra score points
      scoreAddition += nextCombo * 5;
    } else {
      nextCombo = 0;
    }

    const updatedPlayer: PlayerState = {
      ...activePlayer,
      stage: nextStage,
      score: activePlayer.score + (wasCorrect ? scoreAddition : 0),
      combo: nextCombo,
      correctAnswers: activePlayer.correctAnswers + (wasCorrect ? 1 : 0),
      totalAnswers: activePlayer.totalAnswers + 1
    };

    setGameState((prev) => {
      const isWinner = updatedPlayer.stage === 8;
      
      if (isWinner) {
        setTimeout(() => sfx.playWin(), 400);
      }

      return {
        ...prev,
        player1: activePlayerNum === 1 ? updatedPlayer : prev.player1,
        player2: activePlayerNum === 2 ? updatedPlayer : prev.player2,
        gameStatus: isWinner ? 'winner' : 'playing',
        winner: isWinner ? activePlayerNum : null,
        history: [
          ...prev.history,
          {
            player: activePlayerNum,
            question: currentQ,
            wasCorrect: wasCorrect,
            userAnswer: option
          }
        ]
      };
    });
  };

  const proceedToNextTurn = () => {
    sfx.playClick();
    if (gameState.gameStatus === 'winner') return;

    // Switch turns
    const nextPlayerNum = gameState.currentPlayer === 1 ? 2 : 1;
    const nextQ = selectNextQuestion(gameState.history);

    setGameState((prev) => ({
      ...prev,
      currentPlayer: nextPlayerNum,
      currentQuestion: nextQ
    }));

    // Reset UI turn elements
    setTimerCount(20);
    setIsAnswered(false);
    setSelectedOption(null);
    setFeedback(null);
  };

  const getTenseLabel = (tense: string) => {
    switch (tense) {
      case 'pensar_inf': return 'PENSAR + INFINITIVO';
      case 'ir_a_inf': return 'VÕY / IR A + INFINITIVO';
      case 'futuro_simple': return 'FUTURO SIMPLE';
      case 'futuro_perfecto': return 'FUTURO PERFECTO';
      default: return 'ESP FUTURE';
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans">
      
      {/* Dynamic Header */}
      <header className="border-b-4 border-indigo-100 bg-white shadow-sm sticky top-0 z-40 px-4 py-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-md md:text-xl font-bold tracking-tight text-slate-800">
              Իսպաներենի Ապառնի
            </h1>
            <p className="text-[10px] md:text-xs text-slate-500 font-sans font-bold">
              Armenian to Spanish Future Tenses Local 2-Player Game
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Grammar theory button */}
          <button
            onClick={() => {
              sfx.playClick();
              setShowGuide(!showGuide);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans text-xs border transition-all ${
              showGuide 
                ? 'bg-indigo-650 text-white border-indigo-600 font-black shadow-lg shadow-indigo-200' 
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-800 hover:bg-slate-200'
            }`}
            id="grammar-guide-toggle-btn"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showGuide ? 'Փակել Տեսությունը' : 'Գրամատիկայի Տեսություն'}</span>
          </button>

          {/* Sound toggler */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            id="sound-toggle-btn"
            title={soundEnabled ? "Անջատել ձայնը" : 'Միացնել ձայնը'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-650" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* Main content wrapper */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
        
        {/* IF SHOWN GRAMMAR STUDY GUIDE DIRECTLY WINDOW */}
        {showGuide ? (
          <div className="py-2">
            <GrammarGuide onBack={() => setShowGuide(false)} />
          </div>
        ) : (
          <>
            {/* LOBBY / SETUP SCREEN */}
            {gameState.gameStatus === 'lobby' && (
              <div className="max-w-2xl mx-auto w-full bg-white p-6 md:p-8 rounded-3xl border-4 border-slate-200 shadow-xl space-y-8 animate-fade-in text-slate-800">
                
                {/* Logo and Greeting */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-sky-400 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-200 scale-105">
                    <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-sans font-black text-slate-850">
                    Կառուցիր Քո Իսպանական Կոտեջը
                  </h2>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-sans font-medium">
                    2 խաղացողների համար նախատեսված արագ խաղ-դուել: Ճիշտ պատասխանիր իսպաներեն ապառնի ժամանակաձևերի վերաբերյալ հարցերին և կառուցիր քո երազանքների տունը 3D-ով:
                  </p>
                </div>

                {/* Player Credentials Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-sans text-slate-500 flex items-center gap-1.5 uppercase font-black">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      Խաղացող 1 (Կապույտ Կոտեջ)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 font-sans font-bold"
                      placeholder="Անուն կամ Մականուն"
                      value={player1Input}
                      onChange={(e) => setPlayer1Input(e.target.value)}
                      id="p1-name-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-sans text-slate-500 flex items-center gap-1.5 uppercase font-black">
                      <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                      Խաղացող 2 (Կարմիր Կոտեջ)
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-400 font-sans font-bold"
                      placeholder="Անուն կամ Մականուն"
                      value={player2Input}
                      onChange={(e) => setPlayer2Input(e.target.value)}
                      id="p2-name-input"
                    />
                  </div>
                </div>

                {/* Game instruction details list */}
                <div className="bg-sky-50 shadow-inner p-5 rounded-2xl border border-indigo-100 text-xs text-slate-700 space-y-3 font-sans leading-relaxed">
                  <div className="font-extrabold text-indigo-700 text-sm mb-1 flex items-center gap-1">
                    <span>🎮</span>
                    <span>Խաղի Կանոնները`</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-indigo-500">⚡</span>
                    <span>Խաղն անցկացվում է հերթով: Խաղացողները չունեն ժամանակի սահմանափակում և կարող են մտածել այնքան, որքան անհրաժեշտ է:</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-indigo-500">🏢</span>
                    <span>Յուրաքանչյուր ճիշտ պատասխան բարձրացնում է ձեր կոտեջի կառուցման փուլը` սկսած <b>Հիմքից</b> մինչև <b>Լողավազան և կայծեր</b>:</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-indigo-500">🔥</span>
                    <span>Ճիշտ պատասխանների երկար շարքը (Combo) տալիս է հավելյալ միավորներ:</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-indigo-500">🏆</span>
                    <span>Նա, ով առաջինը կավարտի բոլոր 8 փուլերը և կառուցի ամբողջական տունը, կճանաչվի <b>Հաղթող</b>:</span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center flex-col md:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setShowGuide(true)}
                    className="w-full md:w-auto px-6 py-3 bg-slate-100 text-slate-700 border-2 border-slate-200 hover:bg-slate-200 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2 font-sans"
                    id="lobby-read-grammar-btn"
                  >
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    Կարդալ Տեսությունը
                  </button>
                  <button
                    onClick={startNewGame}
                    className="w-full md:w-auto px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all text-center flex items-center justify-center gap-2 text-sm"
                    id="lobby-start-game-btn"
                  >
                    <Users className="w-4 h-4" />
                    Սկսել Դուելը
                  </button>
                </div>

              </div>
            )}

            {/* DUAL GAME BOARD SCREEN */}
            {gameState.gameStatus === 'playing' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* 3D Cottages Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Player 1 Cottage */}
                  <div className="relative">
                    <Cottage3D 
                      stage={gameState.player1.stage} 
                      playerName={gameState.player1.name} 
                      isCurrent={gameState.currentPlayer === 1}
                      themeColor="#3b82f6"
                    />
                    {/* Floating mini stats bar overlay */}
                    <div className="mt-3 flex justify-between items-center px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-xs font-sans font-bold shadow-sm text-slate-600">
                      <span>Միավորներ: <strong className="text-blue-600">{gameState.player1.score}</strong></span>
                      <span>Կոմբո: <strong className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">x{gameState.player1.combo}</strong></span>
                      <span>Ճշգրտություն: <strong className="text-slate-800">
                        {gameState.player1.totalAnswers > 0
                          ? `${Math.round((gameState.player1.correctAnswers / gameState.player1.totalAnswers) * 100)}%`
                          : '0%'}
                      </strong></span>
                    </div>
                  </div>

                  {/* Player 2 Cottage */}
                  <div className="relative">
                    <Cottage3D 
                      stage={gameState.player2.stage} 
                      playerName={gameState.player2.name} 
                      isCurrent={gameState.currentPlayer === 2}
                      themeColor="#ef4444"
                    />
                    {/* Floating mini stats bar overlay */}
                    <div className="mt-3 flex justify-between items-center px-4 py-2 bg-white border-2 border-slate-200 rounded-xl text-xs font-sans font-bold shadow-sm text-slate-600">
                      <span>Միավորներ: <strong className="text-rose-600">{gameState.player2.score}</strong></span>
                      <span>Կոմբո: <strong className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">x{gameState.player2.combo}</strong></span>
                      <span>Ճշգրտություն: <strong className="text-slate-800">
                        {gameState.player2.totalAnswers > 0
                          ? `${Math.round((gameState.player2.correctAnswers / gameState.player2.totalAnswers) * 100)}%`
                          : '0%'}
                      </strong></span>
                    </div>
                  </div>

                </div>

                {/* Central Focus Active Question Interface */}
                <div className={`w-full max-w-3xl mx-auto p-5 md:p-6 rounded-2xl border-4 bg-white transition-all ${
                  gameState.currentPlayer === 1 
                    ? 'border-blue-500 shadow-xl shadow-blue-100/50' 
                    : 'border-rose-500 shadow-xl shadow-rose-100/50'
                }`}>
                  
                  {/* Active Player HUD */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-3 mb-4 gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full ${gameState.currentPlayer === 1 ? 'bg-blue-500 animate-pulse' : 'bg-rose-500 animate-pulse'}`} />
                      <span className="font-sans font-bold text-sm text-slate-600">
                        Հերթը` <strong className="text-slate-850 text-base font-black">{gameState.currentPlayer === 1 ? gameState.player1.name : gameState.player2.name}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Sub-Header indicating Question Category */}
                      <span className="font-sans text-[10px] uppercase font-black tracking-widest px-2.5 py-1 bg-indigo-50 border border-indigo-150 rounded text-indigo-700 flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-3 h-3" />
                        {getTenseLabel(gameState.currentQuestion?.tense || '')}
                      </span>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="space-y-4">
                    <div className="text-slate-500 text-xs font-sans font-bold flex items-center gap-1">
                      <HelpCircle className="w-4 h-4 text-indigo-550" />
                      Թարգմանեք հայերեն նախադասությունը իսպաներեն`
                    </div>
                    
                    <div className="text-slate-900 text-lg font-black font-sans tracking-wide leading-relaxed p-4 bg-slate-50 rounded-xl border-2 border-slate-200 shadow-inner">
                      {gameState.currentQuestion?.armenianSentence}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {gameState.currentQuestion?.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === gameState.currentQuestion?.correctOption;
                        
                        let optionStyle = 'bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/10 font-bold';
                        let prefixBadge = `${idx + 1}`;
                        
                        if (isAnswered) {
                          if (isCorrectOption) {
                            optionStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-850 pointer-events-none font-black shadow-md shadow-emerald-100';
                            prefixBadge = '✓';
                          } else if (isSelected) {
                            optionStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-850 pointer-events-none font-bold';
                            prefixBadge = '✗';
                          } else {
                            optionStyle = 'bg-slate-50 border border-slate-150 text-slate-400 pointer-events-none';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(option)}
                            disabled={isAnswered}
                            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all focus:outline-none ${optionStyle}`}
                            id={`option-btn-${idx}`}
                          >
                            <span className={`w-6 h-6 flex items-center justify-center rounded-lg font-sans text-xs font-bold ${
                              isAnswered && isCorrectOption 
                                ? 'bg-emerald-500 text-white font-black' 
                                : isAnswered && isSelected 
                                ? 'bg-rose-500 text-white font-bold'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {prefixBadge}
                            </span>
                            <span className="flex-1 font-sans tracking-wide">{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation (Educational Core) */}
                    {feedback?.show && gameState.currentQuestion && (
                      <div className={`mt-5 p-5 rounded-2xl border-2 animate-fade-in ${
                        feedback.isCorrect 
                          ? 'bg-emerald-50 border-emerald-300' 
                          : 'bg-rose-50 border-rose-300'
                      }`}>
                        
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {feedback.isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-600" />
                            )}
                          </div>
                          <div className="space-y-2 flex-1">
                            <h4 className="font-sans font-black text-sm text-slate-800">
                              {feedback.isCorrect ? (
                                <span className="text-emerald-700">Հրաշալի՛ պատասխան: 🎉 Քո կոտեջը ստացավ նոր լրացում:</span>
                              ) : (
                                <span className="text-rose-700">Սխալ պատասխան: Ընտրեք ճիշտ տարբերակը.</span>
                              )}
                            </h4>
                            
                            {!feedback.isCorrect && (
                              <div className="font-sans text-xs bg-white p-2.5 rounded xl border border-rose-200 text-emerald-700 font-extrabold mb-2">
                                Correct Answer: {gameState.currentQuestion.correctOption}
                              </div>
                            )}

                            {/* Armenia explanation block */}
                            <div className="text-slate-700 font-medium text-xs md:text-sm leading-relaxed bg-white/70 p-4 rounded-xl border border-slate-100">
                              <span className="font-black text-indigo-700 block mb-1">Բացատրություն (Explicación)`</span>
                              {gameState.currentQuestion.explanationArm}
                            </div>
                          </div>
                        </div>

                        {/* Continue trigger */}
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={proceedToNextTurn}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black font-sans rounded-xl text-xs transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
                            id="proceed-turn-btn"
                          >
                            <span>Հաջորդ հերթը</span>
                            <span>➜</span>
                          </button>
                        </div>

                      </div>
                    )}

                  </div>

                </div>

                {/* Historic Battle Log list */}
                {gameState.history.length > 0 && (
                  <div className="w-full max-w-3xl mx-auto bg-white border-2 border-slate-205 p-5 rounded-2xl shadow-sm text-slate-850">
                    <h3 className="text-xs font-sans font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      Քայլերի Պատմություն (Historial)
                    </h3>
                    <div className="max-h-28 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar text-xs">
                      {gameState.history.slice().reverse().map((hist, idx) => (
                        <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-100">
                          <span className="font-sans font-bold flex items-center gap-1.5 text-slate-700">
                            <span className={`w-1.5 h-1.5 rounded-full ${hist.player === 1 ? 'bg-blue-500' : 'bg-rose-505'}`} />
                            {hist.player === 1 ? gameState.player1.name : gameState.player2.name}
                          </span>
                          <span className="text-slate-500 truncate max-w-[200px] sm:max-w-md font-sans font-medium">{hist.question.armenianSentence}</span>
                          <span className={hist.wasCorrect ? 'text-emerald-600 font-extrabold' : 'text-rose-600 font-extrabold'}>
                            {hist.wasCorrect ? '✓ Ճիշտ' : '✗ Սխալ'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* WINNER SCREEN */}
            {gameState.gameStatus === 'winner' && (
              <div className="max-w-2xl mx-auto w-full bg-white p-6 md:p-8 rounded-3xl border-4 border-indigo-200 shadow-2xl text-center space-y-6 animate-fade-in relative overflow-hidden text-slate-800">
                
                {/* Background party stars */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />

                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto shadow-xl ring-4 ring-indigo-105/20 animate-bounce">
                  <Trophy className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xs font-sans uppercase tracking-widest text-indigo-700 font-black">
                    Շնորհավորում ենք (¡Felicidades!)
                  </h2>
                  <h3 className="text-3xl font-sans font-black text-slate-850 leading-tight">
                    {gameState.winner === 1 ? gameState.player1.name : gameState.player2.name} հաղթե՛ց:
                  </h3>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto font-sans font-medium leading-relaxed">
                    Դուք առաջինը կառուցեցիք ամբողջական կոտեժը՝ տեղադրելով շքեղ լողավազանն ու երեկոյան լույսերը:
                  </p>
                </div>

                {/* Rotating Winner Cottage Display */}
                <div className="flex justify-center p-4">
                  <div className="scale-105 pointer-events-auto">
                    <Cottage3D 
                      stage={8} 
                      playerName={gameState.winner === 1 ? gameState.player1.name : gameState.player2.name} 
                      isCurrent={true} 
                      themeColor={gameState.winner === 1 ? '#3b82f6' : '#ef4444'} 
                    />
                  </div>
                </div>

                {/* Final stats comparison sheet */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left font-sans">
                  <div>
                    <h4 className="text-xs font-sans text-slate-500 mb-2 border-b border-slate-205 pb-1 font-black">
                      {gameState.player1.name}
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700 font-sans font-bold">
                      <li>Միավորներ: <strong className="text-indigo-650">{gameState.player1.score}</strong></li>
                      <li>Փուլ: <strong className="text-blue-600">{gameState.player1.stage}/8</strong></li>
                      <li>Ճշգրտություն: <strong className="text-slate-800">
                        {gameState.player1.totalAnswers > 0
                          ? `${Math.round((gameState.player1.correctAnswers / gameState.player1.totalAnswers) * 100)}%`
                          : '0%'}
                      </strong></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-sans text-slate-500 mb-2 border-b border-slate-205 pb-1 font-black">
                      {gameState.player2.name}
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700 font-sans font-bold">
                      <li>Միավորներ: <strong className="text-indigo-650">{gameState.player2.score}</strong></li>
                      <li>Փուլ: <strong className="text-rose-600">{gameState.player2.stage}/8</strong></li>
                      <li>Ճշգրտություն: <strong className="text-slate-800">
                        {gameState.player2.totalAnswers > 0
                          ? `${Math.round((gameState.player2.correctAnswers / gameState.player2.totalAnswers) * 100)}%`
                          : '0%'}
                      </strong></li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      sfx.playClick();
                      setGameState((prev) => ({ ...prev, gameStatus: 'lobby' }));
                    }}
                    className="px-6 py-3 bg-slate-100 text-slate-700 hover:text-slate-905 border-2 border-slate-200 rounded-xl font-bold text-sm transition-all text-center flex items-center justify-center gap-2"
                    id="win-lobby-btn"
                  >
                    Главное меню
                  </button>
                  <button
                    onClick={startNewGame}
                    className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 text-sm"
                    id="win-restart-btn"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Կրկին Խաղալ
                  </button>
                </div>

              </div>
            )}
          </>
        )}

      </main>

      {/* Styled static footer without tech larp */}
      <footer className="border-t-4 border-slate-100 bg-white p-6 text-center text-xs text-slate-400 font-sans font-bold">
        <div>Construye tu casa con la gramática correcta — Aprende Español</div>
        <div className="text-[10px] text-slate-500 mt-1">© {new Date().getFullYear()} Spanish Future Tense 2-Player Studio</div>
      </footer>

    </div>
  );
}
