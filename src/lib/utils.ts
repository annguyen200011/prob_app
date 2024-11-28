import type { CharacterProperties, PropertyOption } from './types';

export const propertyDisplayNames: { [key in keyof CharacterProperties]: string } = {
	topType: 'Hat Type / Hair Type',
	accessoriesType: 'Glasses Type',
	hairColor: 'Hair Color',
	facialHairType: 'Facial Hair Type',
	facialHairColor: 'Facial Hair Color',
	clotheType: 'Clothe Type',
	clotheColor: 'Clothe Color',
	eyeType: 'Eye Type',
	eyebrowType: 'Eyebrow Type',
	mouthType: 'Mouth Type',
	skinColor: 'Skin Color'
};

export const properties: { [key in keyof CharacterProperties]: PropertyOption[] } = {
	topType: [
		{ display: 'No Hair', value: 'NoHair' },
		{ display: 'Hat', value: 'Hat' },
		{ display: 'Hijab', value: 'Hijab' },
		{ display: 'Turban', value: 'Turban' },
		{ display: 'Winter Hat', value: 'WinterHat1' },
		{ display: 'Long Hair', value: 'LongHairBigHair' },
		{ display: 'Short Hair', value: 'ShortHairShortCurly' }
	],
	accessoriesType: [
		{ display: 'None', value: 'Blank' },
		{ display: 'Glasses', value: 'Round' },
		{ display: 'Sunglasses', value: 'Sunglasses' },
		{ display: 'Wayfarers', value: 'Wayfarers' }
	],
	hairColor: [
		{ display: 'Auburn', value: 'Auburn' },
		{ display: 'Black', value: 'Black' },
		{ display: 'Blonde', value: 'Blonde' },
		{ display: 'Brown', value: 'Brown' },
		{ display: 'Pastel Pink', value: 'PastelPink' },
		{ display: 'Red', value: 'Red' },
		{ display: 'Silver', value: 'SilverGray' }
	],
	facialHairType: [
		{ display: 'None', value: 'Blank' },
		{ display: 'Beard', value: 'BeardMedium' },
		{ display: 'Moustache', value: 'MoustacheFancy' }
	],
	facialHairColor: [
		{ display: 'Auburn', value: 'Auburn' },
		{ display: 'Black', value: 'Black' },
		{ display: 'Blonde', value: 'Blonde' },
		{ display: 'Brown', value: 'Brown' },
		{ display: 'Platinum', value: 'Platinum' },
		{ display: 'Red', value: 'Red' }
	],
	clotheType: [
		{ display: 'Blazer', value: 'BlazerShirt' },
		{ display: 'Sweater', value: 'CollarSweater' },
		{ display: 'Graphic Tee', value: 'GraphicShirt' },
		{ display: 'Hoodie', value: 'Hoodie' },
		{ display: 'Overall', value: 'Overall' },
		{ display: 'Crew Neck Shirt', value: 'ShirtCrewNeck' },
		{ display: 'V-Neck Shirt', value: 'ShirtVNeck' }
	],
	clotheColor: [
		{ display: 'Black', value: 'Black' },
		{ display: 'Blue', value: 'Blue01' },
		{ display: 'Gray', value: 'Gray01' },
		{ display: 'Heather', value: 'Heather' },
		{ display: 'Pastel', value: 'PastelBlue' },
		{ display: 'Pink', value: 'Pink' },
		{ display: 'Red', value: 'Red' },
		{ display: 'White', value: 'White' }
	],
	eyeType: [
		{ display: 'Default', value: 'Default' },
		{ display: 'Cry', value: 'Cry' },
		{ display: 'Happy', value: 'Happy' },
		{ display: 'Surprised', value: 'Surprised' },
		{ display: 'Wink', value: 'Wink' },
		{ display: 'Hearts', value: 'Hearts' },
		{ display: 'Side', value: 'Side' },
		{ display: 'Dizzy', value: 'Dizzy' }
	],
	eyebrowType: [
		{ display: 'Default', value: 'Default' },
		{ display: 'Angry', value: 'Angry' },
		{ display: 'Raised', value: 'RaisedExcited' },
		{ display: 'Sad', value: 'SadConcerned' },
		{ display: 'Unibrow', value: 'UnibrowNatural' },
		{ display: 'UpDown', value: 'UpDown' }
	],
	mouthType: [
		{ display: 'Default', value: 'Default' },
		{ display: 'Smile', value: 'Smile' },
		{ display: 'Sad', value: 'Sad' },
		{ display: 'Grimace', value: 'Grimace' },
		{ display: 'Open', value: 'ScreamOpen' },
		{ display: 'Tongue', value: 'Tongue' }
	],
	skinColor: [
		{ display: 'Light', value: 'Light' },
		{ display: 'Tan', value: 'Tanned' },
		{ display: 'Yellow', value: 'Yellow' },
		{ display: 'Brown', value: 'Brown' },
		{ display: 'Dark', value: 'Black' }
	]
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
		const randomOption = options[Math.floor(Math.random() * options.length)];
		props[propKey] = randomOption.value;
	}

	return props as CharacterProperties;
}

export function generateImageUrl(props: CharacterProperties): string {
	const propsStr = Object.entries(props)
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
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
				'Hat',
				'Hijab',
				'Turban',
				'WinterHat1',
				'WinterHat2',
				'WinterHat3',
				'WinterHat4'
			],
			affects: ['hairColor']
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
