import { build_, carry_, harvest_, initial_speed_, upgrade_ } from '@/module/fun/role';

interface SpawnConstantData {
	[role: string]: {
		num: number; // 默认数量
		ability: number[]; // 默认body个数 [work,carry,move,attack,ranged_attack,heal,claim,tough] 总数别超过50
		adaption?: boolean; // 是否自适应
		must?: boolean; // 是否无论战争还是和平都得孵化
		level?: number; // 孵化优先级
		mark?: string; // 每种爬虫的代号，必须有代号
		init?: boolean; // 是否加入memory初始化
		fun?: (creep: Creep) => void; // 是否有固定函数 【即不接任务】
		mem?: SpawnMemory; // 是否有额外记忆
	};
}

const BodyNameList: string[] = ['work', 'carry', 'move', 'attack', 'ranged_attack', 'heal', 'claim', 'tough'];
/* 不回收的爬虫 */
export const DoNotRecycleRoles: string[] = ['manage', 'transport', 'out-carry', 'defend-attack', 'defend-range', 'defend-douAttack', 'defend-douHeal'];
/* 需要提前孵化的任务爬虫 */
export const NeedSpawnInAdvance: string[] = ['out-harvest', 'out-attack', 'out-defend', 'out-car', 'rush'];

// 根据角色和部件获取部件数量
export const getBodyNumByRoleName = (roleName: string, bodyName: string): number => {
	return RoleData[roleName].ability[BodyNameList.findIndex(x => bodyName === x)];
};

/* 爬虫信息列表 */
export const RoleData: SpawnConstantData = {
	'harvest': {
		num: 0,
		ability: [1, 1, 2, 0, 0, 0, 0, 0],
		adaption: true,
		level: 3,
		mark: '⛏️',
		must: false,
		init: true,
		fun: harvest_
	}, // 矿点采集工
	'carry': {
		num: 0,
		ability: [0, 3, 3, 0, 0, 0, 0, 0],
		level: 4,
		mark: '🚜',
		init: true,
		must: false,
		adaption: true,
		fun: carry_
	}, // 矿点搬运工
	'upgrade': { num: 0, ability: [1, 1, 2, 0, 0, 0, 0, 0], level: 10, mark: '🚬', init: true, fun: upgrade_ }, // 升级工
	'build': { num: 0, ability: [1, 1, 2, 0, 0, 0, 0, 0], level: 10, mark: '🔨', init: true, fun: build_, must: true }, // 建筑工
	'manage': {
		num: 0,
		ability: [0, 1, 1, 0, 0, 0, 0, 0],
		level: 1,
		mark: '🗃️',
		init: true,
		must: true,
		adaption: true
	}, // 中央搬运工

	'transport': {
		num: 0,
		ability: [0, 2, 2, 0, 0, 0, 0, 0],
		level: 2,
		mark: '📦',
		init: true,
		must: true,
		adaption: true
	}, // 房间物流搬运工
	'initial_speed': {
		num: 0,
		ability: [1, 1, 2, 0, 0, 0, 0, 0],
		level: 5,
		mark: '⛏️',
		must: false,
		init: true,
		adaption: true,
		fun: initial_speed_
	}, // 新房间冲级专用
	'repair': { num: 0, ability: [1, 1, 1, 0, 0, 0, 0, 0], level: 8, mark: '🧱', must: true }, // 刷墙
	'cclaim': { num: 0, ability: [0, 0, 5, 0, 0, 0, 1, 0], level: 10, mark: '🐱' }, // 开房sf
	'cupgrade': { num: 0, ability: [2, 5, 7, 0, 0, 0, 0, 0], level: 11, mark: '🐱' },
	'dismantle': { num: 0, ability: [25, 0, 25, 0, 0, 0, 0, 0], level: 11, mark: '⚡' },
	'rush': { num: 0, ability: [10, 2, 5, 0, 0, 0, 0, 0], level: 10, mark: '🚬', must: true },
	'rush-manage': { num: 0, ability: [0, 1, 1, 0, 0, 0, 0, 0], level: 3, mark: '🗃️', must: true, adaption: true }, // 中央搬运工
	'truck': { num: 0, ability: [0, 10, 10, 0, 0, 0, 0, 0], level: 9, mark: '✈️' },
	'truckshard': { num: 0, ability: [0, 5, 5, 0, 0, 0, 0, 0], level: 9, mark: '✈️' },
	'gleaner': { num: 0, ability: [0, 5, 5, 0, 0, 0, 0, 0], level: 9, mark: '✈️' },
	'sfcarry': { num: 0, ability: [0, 20, 20, 0, 0, 0, 0, 0], level: 9, mark: '✈️' },
	'energysupply': { num: 0, ability: [0, 5, 5, 0, 0, 0, 0, 0], level: 9, mark: '✈️' },
	'steal': { num: 0, ability: [0, 5, 5, 0, 0, 0, 0, 0], level: 9, mark: '✈️' },
	'claim': { num: 0, ability: [0, 0, 5, 0, 0, 0, 1, 0], level: 10, mark: '🟣' },
	'Ebuild': { num: 0, ability: [1, 1, 2, 0, 0, 0, 0, 0], level: 10.5, mark: '🛠️' },
	'Eupgrade': { num: 0, ability: [1, 1, 2, 0, 0, 0, 0, 0], level: 10.5, mark: '🚬' },
	'double-attack': { num: 0, ability: [0, 0, 10, 30, 0, 0, 0, 10], level: 10, mark: '⚔️', must: true },
	'double-heal': { num: 0, ability: [0, 0, 10, 0, 5, 30, 0, 5], level: 10, mark: '🩹', must: true },
	'double-dismantle': { num: 0, ability: [25, 0, 10, 0, 0, 0, 0, 15], level: 10, mark: '⚒️', must: true },
	'claim-attack': { num: 0, ability: [0, 0, 1, 0, 0, 0, 1, 0], level: 10, mark: '🟣' },
	'architect': { num: 0, ability: [15, 10, 10, 0, 0, 10, 0, 5], level: 10, mark: '🚒' },
	'upgrade-work': { num: 0, ability: [5, 20, 10, 0, 0, 10, 0, 5], level: 10, mark: '🔨' },
	'repair-work': { num: 0, ability: [1, 1, 1, 0, 0, 0, 0, 0], level: 8, mark: '🧱', must: true }, // 刷墙
	'scout': { num: 0, ability: [0, 0, 1, 0, 0, 0, 0, 0], level: 15, mark: '✏️' },
	'aio': { num: 0, ability: [0, 0, 25, 0, 13, 12, 0, 0], level: 10, mark: '⚡' },
	'saio': { num: 0, ability: [0, 0, 25, 0, 10, 15, 0, 0], level: 10, mark: '⚡' }, // 支援一体机
	'caio': { num: 0, ability: [0, 0, 10, 0, 28, 8, 0, 4], level: 8, mark: '⚡' }, // 过道一体机
	'mineral': { num: 0, ability: [15, 15, 15, 0, 0, 0, 0, 0], level: 11, mark: '🪓' },
	'harass': { num: 0, ability: [17, 10, 20, 0, 0, 3, 0, 0], level: 10, mark: '🚨' },
	/*本房间拆迁队*/
	'r-dismantle': { num: 0, ability: [10, 0, 5, 0, 0, 0, 0, 0], level: 11, mark: '⚡' },
	'r-carry': { num: 0, ability: [0, 10, 5, 0, 0, 0, 0, 0], level: 10, mark: '📦' },
	/* 外矿 */
	'out-claim': { num: 0, ability: [0, 0, 5, 0, 0, 0, 5, 0], level: 9, adaption: true, mark: '🟣' },
	'out-harvest': { num: 0, ability: [4, 2, 4, 0, 0, 0, 0, 0], level: 9.5, mark: '⛏️' },
	'out-car': { num: 0, ability: [1, 5, 6, 0, 0, 0, 0, 0], level: 11, mark: '🚜' },
	'out-carry': { num: 0, ability: [0, 5, 5, 0, 0, 0, 0, 0], level: 12, mark: '🚜' },
	'out-defend': { num: 0, ability: [0, 0, 5, 5, 0, 5, 0, 0], level: 8, mark: '🧹' },
	'out-invader': { num: 0, ability: [0, 0, 5, 5, 0, 6, 0, 0], level: 10, mark: '⚔️' },
	'out-attack': { num: 0, ability: [0, 0, 25, 19, 0, 6, 0, 0], level: 9, mark: '⚔️' },
	/* 帕瓦 */
	'power-attack': { num: 0, ability: [0, 0, 25, 20, 0, 0, 0, 5], level: 10, mark: '🍎' },
	'power-heal': { num: 0, ability: [0, 0, 25, 0, 0, 25, 0, 0], level: 10, mark: '🍏' },
	'power-carry': { num: 0, ability: [0, 30, 16, 1, 1, 0, 0, 0], level: 10, mark: '📦' },
	/* 沉积物 */
	'deposit': { num: 0, ability: [15, 10, 25, 0, 0, 0, 0, 0], level: 11, mark: '⚙️' },
	'deposit-harvest': { num: 0, ability: [18, 10, 20, 1, 1, 0, 0, 0], level: 11, mark: '⚙️', must: true },
	'deposit-transfer': { num: 0, ability: [0, 23, 25, 1, 1, 0, 0, 0], level: 11, mark: '⚙️' },
	'deposit-attack': { num: 0, ability: [0, 0, 25, 15, 0, 10, 0, 0], level: 8, mark: '🔴', must: true },
	'deposit-range': { num: 0, ability: [0, 0, 25, 0, 15, 10, 0, 0], level: 8, mark: '🔵', must: true },
	'deposit-douAttack': { num: 0, ability: [0, 0, 25, 25, 0, 0, 0, 0], level: 7, mark: '🔴', must: true },
	'deposit-douHeal': { num: 0, ability: [0, 0, 25, 0, 0, 25, 0, 0], level: 7, mark: '🟢', must: true },
	/* 主动防御 */
	'defend-attack': { num: 0, ability: [0, 0, 10, 40, 0, 0, 0, 0], level: 8, mark: '🔴', must: true },
	'defend-range': { num: 0, ability: [0, 0, 10, 0, 40, 0, 0, 0], level: 8, mark: '🔵', must: true },
	'defend-douAttack': { num: 0, ability: [0, 0, 10, 25, 0, 0, 0, 15], level: 7, mark: '🔴', must: true },
	'defend-douHeal': { num: 0, ability: [0, 0, 10, 0, 0, 30, 0, 10], level: 7, mark: '🟢', must: true },
	/* 四人小队 */
	'x-dismantle': {
		num: 0,
		ability: [25, 0, 10, 0, 0, 0, 0, 15],
		level: 8,
		mark: '🟨',
		must: true,
		mem: { creepType: 'attack' }
	},
	'x-heal': {
		num: 0,
		ability: [0, 0, 10, 0, 1, 24, 0, 15],
		level: 9,
		mark: '🟩',
		must: true,
		mem: { creepType: 'heal' }
	},
	'x-attack': {
		num: 0,
		ability: [0, 0, 10, 25, 0, 0, 0, 15],
		level: 8,
		mark: '🟥',
		must: true,
		mem: { creepType: 'attack' }
	},
	'x-attack2': {
		num: 0,
		ability: [0, 0, 10, 25, 0, 0, 0, 15],
		level: 8,
		mark: '🟥',
		must: true,
		mem: { creepType: 'attack' }
	},
	'x-range': {
		num: 0,
		ability: [0, 0, 10, 0, 22, 3, 0, 15],
		level: 8,
		mark: '🟦',
		must: true,
		mem: { creepType: 'attack' }
	},
	'x-aio': {
		num: 0,
		ability: [0, 0, 10, 0, 10, 20, 0, 10],
		level: 9,
		mark: '🌈',
		must: true,
		mem: { creepType: 'heal' }
	},
	/*Ai战争*/
	'Ai-sentry': {
		num: 0,
		ability: [0, 0, 10, 0, 0, 20, 0, 20],
		level: 9,
		mark: '🚨',
		must: true,
		mem: { creepType: 'sentry' }
	},
	'c-construction-site': { num: 0, ability: [0, 0, 1, 0, 0, 0, 0, 0], level: 9, mark: '🥾', must: true }
};
/* 爬虫部件随房间等级变化的动态列表 */
export const RoleLevelData = {
	'claim-attack': {
		6: { bodypart: [0, 0, 1, 0, 0, 0, 1, 0], num: 0 },
		7: { bodypart: [0, 0, 1, 0, 0, 0, 1, 0], num: 0 },
		8: { bodypart: [0, 0, 15, 0, 0, 0, 15, 0], num: 0 }
	},
	'harvest': {
		1: { bodypart: [2, 1, 1, 0, 0, 0, 0, 0], num: 2 },
		2: { bodypart: [3, 1, 1, 0, 0, 0, 0, 0], num: 2 },
		3: { bodypart: [5, 1, 3, 0, 0, 0, 0, 0], num: 2 },
		4: { bodypart: [6, 1, 3, 0, 0, 0, 0, 0], num: 2 },
		5: { bodypart: [7, 2, 4, 0, 0, 0, 0, 0], num: 2 },
		6: { bodypart: [10, 2, 5, 0, 0, 0, 0, 0], num: 2 },
		7: { bodypart: [10, 2, 5, 0, 0, 0, 0, 0], num: 2 },
		8: { bodypart: [10, 2, 5, 0, 0, 0, 0, 0], num: 2, upbodypart: [20, 4, 10, 0, 0, 0, 0, 0] }
	},
	'initial_speed': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 2 },
		2: { bodypart: [3, 2, 3, 0, 0, 0, 0, 0], num: 12 },
		3: { bodypart: [4, 4, 4, 0, 0, 0, 0, 0], num: 12 },
		4: { bodypart: [5, 5, 10, 0, 0, 0, 0, 0], num: 12 },
		5: { bodypart: [10, 6, 10, 0, 0, 0, 0, 0], num: 12 },
		6: { bodypart: [10, 6, 10, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [10, 6, 10, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [10, 6, 10, 0, 0, 0, 0, 0], num: 0 }
	},
	'carry': {
		1: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 2 },
		2: { bodypart: [0, 3, 3, 0, 0, 0, 0, 0], num: 2 },
		3: { bodypart: [0, 4, 4, 0, 0, 0, 0, 0], num: 2 },
		4: { bodypart: [0, 8, 8, 0, 0, 0, 0, 0], num: 2 },
		5: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 2 },
		6: { bodypart: [0, 15, 15, 0, 0, 0, 0, 0], num: 1 },
		7: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 0 }
	},
	'upgrade': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 3 },
		2: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 3 },
		3: { bodypart: [3, 3, 6, 0, 0, 0, 0, 0], num: 3 },
		4: { bodypart: [4, 4, 8, 0, 0, 0, 0, 0], num: 2 },
		5: { bodypart: [6, 6, 6, 0, 0, 0, 0, 0], num: 2, upbodypart: [5, 10, 15, 0, 0, 0, 0, 0] },
		6: { bodypart: [7, 7, 7, 0, 0, 0, 0, 0], num: 1, upbodypart: [7, 7, 7, 0, 0, 0, 0, 0] },
		7: { bodypart: [30, 5, 15, 0, 0, 0, 0, 0], num: 1, upbodypart: [10, 10, 5, 0, 0, 0, 0, 0] },
		8: { bodypart: [15, 4, 8, 0, 0, 0, 0, 0], num: 1, upbodypart: [15, 15, 5, 0, 0, 0, 0, 0] }
	},
	'build': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [3, 3, 6, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [4, 4, 8, 0, 0, 0, 0, 0], num: 1 },
		5: { bodypart: [4, 10, 7, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [5, 15, 20, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [10, 20, 15, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [15, 15, 15, 0, 0, 0, 0, 0], num: 0 }
	},
	'transport': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 5, 5, 0, 0, 0, 0, 0], num: 1 },
		5: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 1, upbodypart: [0, 10, 5, 0, 0, 0, 0, 0] },
		6: { bodypart: [0, 15, 15, 0, 0, 0, 0, 0], num: 1, upbodypart: [0, 15, 8, 0, 0, 0, 0, 0] },
		7: { bodypart: [0, 24, 24, 0, 0, 0, 0, 0], num: 1, upbodypart: [0, 24, 12, 0, 0, 0, 0, 0] },
		8: { bodypart: [0, 24, 24, 0, 0, 0, 0, 0], num: 1, upbodypart: [0, 24, 12, 0, 0, 0, 0, 0] }
	},
	'gleaner': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 5, 5, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 15, 15, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 20, 20, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 24, 24, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 24, 24, 0, 0, 0, 0, 0], num: 0 }
	},
	'energysupply': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 5, 5, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 15, 15, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 20, 20, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 24, 24, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 24, 24, 0, 0, 0, 0, 0], num: 0 }
	},
	'steal': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 5, 5, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 8, 8, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 15, 15, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 20, 20, 0, 0, 0, 0, 0], num: 0 }
	},
	'manage': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 1 },
		5: { bodypart: [0, 10, 5, 0, 0, 0, 0, 0], num: 1 },
		6: { bodypart: [0, 30, 15, 0, 0, 0, 0, 0], num: 1 },
		7: { bodypart: [0, 32, 16, 0, 0, 0, 0, 0], num: 1 },
		8: { bodypart: [0, 32, 16, 0, 0, 0, 0, 0], num: 1 }
	},
	'rush-manage': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 14, 1, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 45, 1, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 49, 1, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 49, 1, 0, 0, 0, 0, 0], num: 0 }
	},
	'repair': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [5, 5, 5, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [8, 8, 8, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [10, 10, 10, 0, 0, 0, 0, 0], num: 0, upbodypart: [10, 20, 15, 0, 0, 0, 0, 0] },
		8: { bodypart: [15, 18, 17, 0, 0, 0, 0, 0], num: 0, upbodypart: [10, 20, 15, 0, 0, 0, 0, 0] }
	},
	'dismantle': {
		1: { bodypart: [1, 0, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [2, 0, 2, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [3, 0, 3, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [3, 0, 3, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [6, 0, 6, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [10, 0, 10, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [20, 0, 20, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [25, 0, 25, 0, 0, 0, 0, 0], num: 0 }
	},
	'rush': {
		6: { bodypart: [17, 1, 9, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [39, 1, 10, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [39, 1, 10, 0, 0, 0, 0, 0], num: 0 }
	},
	'truck': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 3, 3, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 4, 4, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 8, 8, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 20, 20, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 25, 25, 0, 0, 0, 0, 0], num: 0 }
	},
	'Ebuild': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [4, 4, 8, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [7, 7, 14, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [10, 10, 20, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [15, 15, 15, 0, 0, 0, 0, 0], num: 0 }
	},
	'Eupgrade': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [2, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [4, 4, 8, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [7, 7, 14, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [10, 10, 20, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [15, 15, 15, 0, 0, 0, 0, 0], num: 0 }
	},
	'out-harvest': {
		1: { bodypart: [1, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [1, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [1, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [5, 1, 3, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [6, 2, 3, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [8, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [8, 2, 4, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [10, 2, 6, 0, 0, 0, 0, 0], num: 0 }
	},
	'out-car': {
		1: { bodypart: [1, 1, 2, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [1, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [1, 2, 3, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [1, 7, 4, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [1, 21, 11, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [2, 20, 11, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [2, 26, 14, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [2, 30, 16, 0, 0, 0, 0, 0], num: 0 }
	},
	'out-carry': {
		1: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 3, 3, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 4, 4, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 8, 4, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 20, 10, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 20, 10, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 26, 13, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 30, 15, 0, 0, 0, 0, 0], num: 0 }
	},
	'out-defend': {
		1: { bodypart: [0, 0, 1, 0, 0, 1, 0, 0], num: 0 },
		2: { bodypart: [0, 0, 1, 0, 0, 1, 0, 0], num: 0 },
		3: { bodypart: [0, 0, 1, 0, 0, 1, 0, 0], num: 0 },
		4: { bodypart: [0, 0, 3, 0, 2, 2, 0, 0], num: 0 },
		5: { bodypart: [0, 0, 6, 0, 3, 3, 0, 0], num: 0 },
		6: { bodypart: [0, 0, 8, 0, 4, 4, 0, 0], num: 0 },
		7: { bodypart: [0, 0, 16, 0, 8, 8, 0, 0], num: 0 },
		8: { bodypart: [0, 0, 25, 0, 15, 10, 0, 0], num: 0 }
	},
	'out-invader': {
		1: { bodypart: [0, 0, 1, 0, 0, 1, 0, 0], num: 0 },
		2: { bodypart: [0, 0, 1, 0, 0, 1, 0, 0], num: 0 },
		3: { bodypart: [0, 0, 1, 0, 0, 1, 0, 0], num: 0 },
		4: { bodypart: [0, 0, 3, 3, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 0, 6, 6, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 0, 8, 8, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 0, 15, 15, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 0, 15, 15, 0, 0, 0, 0], num: 0 }
	},
	'r-dismantle': {
		1: { bodypart: [1, 0, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [2, 0, 2, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [3, 0, 3, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [3, 0, 3, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [6, 0, 6, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [10, 0, 10, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [20, 0, 10, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [30, 0, 15, 0, 0, 0, 0, 0], num: 0 }
	},
	'r-carry': {
		1: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		2: { bodypart: [0, 1, 1, 0, 0, 0, 0, 0], num: 0 },
		3: { bodypart: [0, 2, 2, 0, 0, 0, 0, 0], num: 0 },
		4: { bodypart: [0, 5, 5, 0, 0, 0, 0, 0], num: 0 },
		5: { bodypart: [0, 10, 10, 0, 0, 0, 0, 0], num: 0 },
		6: { bodypart: [0, 16, 8, 0, 0, 0, 0, 0], num: 0 },
		7: { bodypart: [0, 30, 15, 0, 0, 0, 0, 0], num: 0 },
		8: { bodypart: [0, 32, 16, 0, 0, 0, 0, 0], num: 0 }
	}
};
