export interface IlosData {
  fullName: string;
  nickname: string;
  birthDate: string; // "1998-08-20"
  turningAge: number;
  mother: string;
  creator: string;
  friend: string;
  favoriteColor: string;
  footballTeam: string;
  footballPlayers: string[];
  favoriteFoods: string[];
  favoriteDrinks: string[];
  dreamCars: string[];
  favoriteSeries: string;
  favoriteSong: {
    title: string;
    artist: string;
    audioSrc?: string;
  };
  loveGardenNote: string;
  kpssDream: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  hint: string;
  iconName: string;
  unlocked: boolean;
  category: 'garden' | 'kpss' | 'food' | 'secret' | 'sport' | 'general';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    key: string;
    text: string;
    isIlosChoice: boolean;
    funnyComment?: string;
  }[];
}

export interface ApprovedMenuItem {
  id: string;
  title: string;
  subtitle: string;
  ratingText: string;
  emoji: string;
  tag: string;
  bgGradient: string;
  description: string;
}

export interface FlowerItem {
  id: number;
  word: string;
  subtext: string;
  x: number; // percentage
  y: number;
  delay: number;
}
