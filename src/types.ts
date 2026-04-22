export type ViewType = 
  | 'board'
  | 'diagram'
  | 'examples'
  | 'quiz'
  | 'game';

export type RockState = 'Sediment' | 'Sedimentary Rock' | 'Metamorphic Rock' | 'Magma' | 'Igneous Rock';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface RealWorldExample {
  id: string;
  name: string;
  type: string;
  description: string;
  energySource: string;
  imageUrl: string;
}
