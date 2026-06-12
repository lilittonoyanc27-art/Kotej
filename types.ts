export type SpanishFutureTense = 'pensar_inf' | 'ir_a_inf' | 'futuro_simple' | 'futuro_perfecto';

export interface Question {
  id: string;
  tense: SpanishFutureTense;
  armenianSentence: string;
  spanishSentence: string;
  options: string[]; // for multiple choice
  correctOption: string;
  explanationArm: string; // Explanation in Armenian
  explanationSp: string; // Context in Spanish
}

export type CottageStage = 
  | 0 // Ground/Prep
  | 1 // Foundation (Հիմք)
  | 2 // Walls & Structure (Պատեր և Սյուներ)
  | 3 // Windows (Պատուհաններ)
  | 4 // Door & Porch (Դուռ և Պատշգամբ)
  | 5 // Roof (Տանիք)
  | 6 // Chimney & Smoke (Ծխնելույզ և Ծուխ)
  | 7 // Garden & Fence (Այգի և Ցանկապատ)
  | 8; // Luxury Pool & Lights (Լողավազան և Լույսեր)

export interface PlayerState {
  name: string;
  stage: CottageStage;
  score: number;
  combo: number;
  correctAnswers: number;
  totalAnswers: number;
}

export interface GameState {
  player1: PlayerState;
  player2: PlayerState;
  currentPlayer: 1 | 2;
  currentQuestion: Question | null;
  gameStatus: 'lobby' | 'playing' | 'winner' | 'study';
  winner: 1 | 2 | null;
  history: Array<{
    player: 1 | 2;
    question: Question;
    wasCorrect: boolean;
    userAnswer: string;
  }>;
}
