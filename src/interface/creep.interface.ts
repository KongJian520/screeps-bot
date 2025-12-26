/* 爬虫常用类型及定义 */

// interface Creep {}

interface CreepMemory {
	belong: string; // 爬虫所属房间
	shard: string; // 爬虫所属shard
	role: string; // 爬虫角色
	working: boolean;
	/* 每个爬虫都必须有该记忆，方便boost */
	boostData: BoostData;
	/* 目标Id */
	targetID?: Id<any>;
	workSites?: boolean;
	enemyID?: string; //附近敌人id
	hasDefeatedInvader?: boolean; // 是否击杀过入侵者
	waitForDefender?: boolean; // 是否等待防御者
	containerID?: string;
	adaption?: boolean;
	taskRB?: string;
	msb?: boolean;
	boostState?: boolean; //boost强化状态
	worthUnboost?: boolean; //是否值得回收强化
	recycleState?: boolean; //回收状态
	notifyWhenAttacked?: boolean;
	// 爬说话
	sayHi?: SayHi;
	// 初始身体部件统计
	bodyPartCount?: {
		[bodyType in BodyPartConstant]?: number;
	};
	bodynumber?: number;
	Rerunt?: number /*爬的重启时间*/
	;
	initialID?: string; // 初始小队id
	workpos?: { x: number; y: number; roomName: string } | RoomPosition;
	avoidNukeId?: string; // 需要躲避核弹
	avoidNukeRoom?: string; // 躲避核弹的房间
}

interface BoostData {
	[body: string]: Boosted;
}

interface Boosted {
	boosted?: boolean;
	type?: ResourceConstant;
	num?: number;
}

interface SayHi {
	state: stateType;
	saying: string;
	canSay?: boolean | undefined;
	lastIndex?: number;
}
