/* 房间常用类型及定义 */

interface RoomMemory {
	record?: RoomRecord;
	economy?: boolean; // 经济模式 此模式下 非必要不会升级以节约能量的消耗
	upgradeBoost?: string; // 升级爬boost
}

interface RoomRecord {
	levelup?: Levelup; // 升级时间
}

interface Levelup {
	1?: number;
	2?: number;
	3?: number;
	4?: number;
	5?: number;
	6?: number;
	7?: number;
	8?: number;
	to8?: number;
}

