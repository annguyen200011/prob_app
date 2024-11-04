export interface CharacterProperties {
	topType: string;
	accessoriesType: string;
	hairColor: string;
	facialHairType: string;
	facialHairColor: string;
	clotheType: string;
	clotheColor: string;
	eyeType: string;
	eyebrowType: string;
	mouthType: string;
	skinColor: string;
}

export interface Character {
	id: number;
	name: string;
	properties: CharacterProperties;
	probability: number;
	imageUrl: string;
}

export interface Question {
	type: 'is' | 'is_not';
	property: keyof CharacterProperties;
	adjective: string;
}

export interface ChatEntry {
	sender: 'user' | 'bot';
	message: string;
}

export interface GameState {
	targetCharacter: Character | null;
	gameStarted: boolean;
	gameWon: boolean;
	guessResult: 'correct' | 'incorrect' | null;
}
