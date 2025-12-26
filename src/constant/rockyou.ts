export const signConstant = [

	'致命错误......',

];

export function randomRange(lowerValue: number, upperValue: number): number {
	const total = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * total + lowerValue);
}

export function randomSign(): string {
	const length = signConstant.length;
	let index = randomRange(0, length - 1);
	if (index < 0) index = 0;
	if (index >= signConstant.length) index = signConstant.length - 1;
	return signConstant[index];
}
