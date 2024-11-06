import type { CharacterProperties } from './types';

const properties: { [key in keyof CharacterProperties]: string[] } = {
	topType: [
		'NoHair',
		'Eyepatch',
		'Hat',
		'Hijab',
		'Turban',
		'WinterHat1',
		'WinterHat2',
		'WinterHat3',
		'WinterHat4',
		'LongHairBigHair',
		'LongHairBob',
		'LongHairBun',
		'LongHairCurly',
		'LongHairCurvy',
		'LongHairDreads',
		'LongHairFrida',
		'LongHairFro',
		'LongHairFroBand',
		'LongHairNotTooLong',
		'LongHairShavedSides',
		'LongHairMiaWallace',
		'LongHairStraight',
		'LongHairStraight2',
		'LongHairStraightStrand',
		'ShortHairDreads01',
		'ShortHairDreads02',
		'ShortHairFrizzle',
		'ShortHairShaggyMullet',
		'ShortHairShortCurly',
		'ShortHairShortFlat',
		'ShortHairShortRound',
		'ShortHairShortWaved',
		'ShortHairSides',
		'ShortHairTheCaesar',
		'ShortHairTheCaesarSidePart'
	],
	accessoriesType: [
		'Blank',
		'Kurt',
		'Prescription01',
		'Prescription02',
		'Round',
		'Sunglasses',
		'Wayfarers'
	],
	hairColor: [
		'Auburn',
		'Black',
		'Blonde',
		'BlondeGolden',
		'Brown',
		'BrownDark',
		'PastelPink',
		'Blue',
		'Platinum',
		'Red',
		'SilverGray'
	],
	facialHairType: [
		'Blank',
		'BeardMedium',
		'BeardLight',
		'BeardMajestic',
		'MoustacheFancy',
		'MoustacheMagnum'
	],
	facialHairColor: [
		'Auburn',
		'Black',
		'Blonde',
		'BlondeGolden',
		'Brown',
		'BrownDark',
		'Platinum',
		'Red'
	],
	clotheType: [
		'BlazerShirt',
		'BlazerSweater',
		'CollarSweater',
		'GraphicShirt',
		'Hoodie',
		'Overall',
		'ShirtCrewNeck',
		'ShirtScoopNeck',
		'ShirtVNeck'
	],
	clotheColor: [
		'Black',
		'Blue01',
		'Blue02',
		'Blue03',
		'Gray01',
		'Gray02',
		'Heather',
		'PastelBlue',
		'PastelGreen',
		'PastelOrange',
		'PastelRed',
		'PastelYellow',
		'Pink',
		'Red',
		'White'
	],
	eyeType: [
		'Close',
		'Cry',
		'Default',
		'Dizzy',
		'EyeRoll',
		'Happy',
		'Hearts',
		'Side',
		'Squint',
		'Surprised',
		'Wink',
		'WinkWacky'
	],
	eyebrowType: [
		'Angry',
		'AngryNatural',
		'Default',
		'DefaultNatural',
		'FlatNatural',
		'RaisedExcited',
		'RaisedExcitedNatural',
		'SadConcerned',
		'SadConcernedNatural',
		'UnibrowNatural',
		'UpDown',
		'UpDownNatural'
	],
	mouthType: [
		'Concerned',
		'Default',
		'Disbelief',
		'Eating',
		'Grimace',
		'Sad',
		'ScreamOpen',
		'Serious',
		'Smile',
		'Tongue',
		'Twinkle',
		'Vomit'
	],
	skinColor: ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']
};

const characterNames = [
	'Aldric',
	'Lyra',
	'Finnian',
	'Seraphina',
	'Kaelan',
	'Isolde',
	'Thorne',
	'Elara',
	'Roderic',
	'Amara',
	'Cedric',
	'Liora',
	'Gareth',
	'Esme',
	'Leoric',
	'Mira',
	'Darian',
	'Rowan',
	'Callista',
	'Theron',
	'Cassian',
	'Freya',
	'Lucian',
	'Maeve',
	'Aric',
	'Soraya',
	'Bran',
	'Celeste',
	'Evander',
	'Nerys',
	'Quentin',
	'Selene',
	'Valen',
	'Nimue',
	'Tristan',
	'Evelyn',
	'Orin',
	'Elowen',
	'Percival',
	'Astrid',
	'Lorcan',
	'Sabrina',
	'Tavian',
	'Melisande',
	'Eamon',
	'Thalia',
	'Oberon',
	'Bryony',
	'Soren',
	'Yara',
	'Galad',
	'Ianthe',
	'Riven',
	'Kendra',
	'Calix',
	'Odessa',
	'Xander',
	'Daphne',
	'Magnus',
	'Fiona',
	'Caelan',
	'Zara',
	'Alaric',
	'Helene',
	'Fintan',
	'Astra',
	'Torian',
	'Morrigan',
	'Caspian',
	'Sabine',
	'Luken',
	'Viviana',
	'Rhys',
	'Rhea',
	'Drake',
	'Lysandra',
	'Jareth',
	'Inara',
	'Griffin',
	'Selina',
	'Zephyr',
	'Talia',
	'Alistair',
	'Briony',
	'Corwin',
	'Sable',
	'Dorian',
	'Anwen',
	'Galen',
	'Arista',
	'Kael',
	'Eris',
	'Marek',
	'Ophelia',
	'Torin',
	'Rhiannon',
	'Theron',
	'Nyssa',
	'Kellen',
	'Mira',
	'Soren',
	'Eira',
	'Bram',
	'Leona'
];

let shuffledNames: string[] = [];
let nameIndex = 0;

export function generateRandomProps(): CharacterProperties {
	const props: Partial<CharacterProperties> = {};

	for (const key in properties) {
		const propKey = key as keyof CharacterProperties;
		const options = properties[propKey];
		props[propKey] = options[Math.floor(Math.random() * options.length)];
	}

	return props as CharacterProperties;
}

export function generateImageUrl(props: CharacterProperties): string {
	const propsStr = Object.entries(props)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
	return `https://avataaars.io/?avatarStyle=Transparent&${propsStr}`;
}

function shuffleArray(array: string[]): string[] {
	return array
		.map((name) => ({ name, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ name }) => name);
}

export function getRandomName(): string {
	// Shuffle names once if this is the first call or if all names have been used
	if (shuffledNames.length === 0 || nameIndex >= shuffledNames.length) {
		shuffledNames = shuffleArray([...characterNames]);
		nameIndex = 0; // reset index
	}

	// Pick the next name in the shuffled array
	const name = shuffledNames[nameIndex];
	nameIndex++;
	return name;
}

export const propertyDependencies: {
	[key in keyof CharacterProperties]?: Array<{
		values: string[];
		affects: Array<keyof CharacterProperties>;
	}>;
} = {
	topType: [
		{
			values: [
				'NoHair',
				'Eyepatch',
				'Hat',
				'Hijab',
				'Turban',
				'WinterHat1',
				'WinterHat2',
				'WinterHat3',
				'WinterHat4'
			],
			affects: ['hairColor']
		},
		{
			values: ['Eyepatch'],
			affects: ['accessoriesType']
		}
	],
	accessoriesType: [
		{
			values: ['Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'],
			affects: ['eyebrowType']
		},
		{
			values: ['Kurt', 'Sunglasses', 'Wayfarers'],
			affects: ['eyeType']
		}
	],
	facialHairType: [
		{
			values: ['Blank'],
			affects: ['facialHairColor']
		}
	],
	clotheType: [
		{
			values: ['BlazerShirt', 'BlazerSweater'],
			affects: ['clotheColor']
		}
	]
};

/**
 * Determines which properties are obscured based on the character's attributes.
 * @param characterProperties - The properties of the character.
 * @returns A set of obscured properties.
 */
export function getObscuredProperties(
	characterProperties: CharacterProperties
): Set<keyof CharacterProperties> {
	const obscured = new Set<keyof CharacterProperties>();

	for (const [property, dependencyArray] of Object.entries(propertyDependencies)) {
		const prop = property as keyof CharacterProperties;
		const value = characterProperties[prop];

		if (dependencyArray) {
			for (const dependency of dependencyArray) {
				if (dependency.values.includes(value)) {
					for (const affectedProp of dependency.affects) {
						obscured.add(affectedProp);
					}
				}
			}
		}
	}

	return obscured;
}
