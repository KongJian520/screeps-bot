export const BoostedPartData: { [str: string]: BodyPartConstant } = {
	UH: 'attack',
	UH2O: 'attack',
	XUH2O: 'attack',
	UO: 'work',
	UHO2: 'work',
	XUHO2: 'work',
	KH: 'carry',
	KH2O: 'carry',
	XKH2O: 'carry',
	KO: 'ranged_attack',
	KHO2: 'ranged_attack',
	XKHO2: 'ranged_attack',
	LH: 'work',
	LH2O: 'work',
	XLH2O: 'work',
	LO: 'heal',
	LHO2: 'heal',
	XLHO2: 'heal',
	ZH: 'work',
	ZH2O: 'work',
	XZH2O: 'work',
	ZO: 'move',
	ZHO2: 'move',
	XZHO2: 'move',
	GH: 'work',
	GH2O: 'work',
	XGH2O: 'work',
	GO: 'tough',
	GHO2: 'tough',
	XGHO2: 'tough'
};

export const WorkBoostData: { [str: string]: string } = {
	UO: 'harvest',
	UHO2: 'harvest',
	XUHO2: 'harvest',
	LH: 'repair',
	LH2O: 'repair',
	XLH2O: 'repair',
	ZH: 'dismantle',
	ZH2O: 'dismantle',
	XZH2O: 'dismantle',
	GH: 'upgrade',
	GH2O: 'upgrade',
	XGH2O: 'upgrade'
};

export const RADamageByRange = [10, 10, 4, 1];

export const TowerRepairByRange = [
	800, 800, 800, 800, 800, 800, 760, 720, 680, 640, 600, 560, 520, 480, 440, 400, 360, 320, 280, 240, 200
];

export const TowerDamageByRange = [
	600, 600, 600, 600, 600, 600, 570, 540, 510, 480, 450, 420, 390, 360, 330, 300, 270, 240, 210, 180, 150
];

export const TowerHealByRange = [
	400, 400, 400, 400, 400, 400, 380, 360, 340, 320, 300, 280, 260, 240, 220, 200, 180, 160, 140, 120, 100
];
