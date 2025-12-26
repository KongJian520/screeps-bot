// import { RoleData, RoleLevelData } from '@/constant/SpawnConstant';
// import { CalculateEnergy, GenerateAbility } from '@/utils';
import { RoleData, RoleLevelData } from "../constant/SpawnConstant";


export const creepRunner = function (creep: Creep): void {
	if (creep.memory.Rerunt) {
		/*指令级别的操作闲置*/
		if (creep.memory.Rerunt > Game.time && !(Game.getObjectById(creep.memory.targetID as Id<Source>) as Source).effects) {
			Memory.creepscpu![creep.name] = '';
			return;
		} else delete creep.memory.Rerunt;
	}
	// // 模仿原神角色说话，要求爬命名时必须使用shenli的命名方法
	// if (creep.owner.username === 'shenli') {
	//   if (Math.random() < 0.4) creep.sayHi(creep.room.memory.state);
	// }
	let cpu_test = false;
	if (Memory.Systemswitch.Showtestcreep) {
		cpu_test = true;
	}
	const cpu_list: number[] = [];
	if (cpu_test) {
		cpu_list.push(Game.cpu.getUsed());
	}
	if (creep.spawning) {
		/* 爬虫出生角色可视化 */
		creep.room.visual.text(`${creep.memory.role}`, creep.pos.x, creep.pos.y, {
			color: '#ffffff',
			font: 0.5,
			align: 'center',
			stroke: '#ff9900'
		});
	}
	/* 跨shard找回记忆 */
	// if (!creep.memory.role) {
	// 	const InshardMemory = global.intershardData;
	// 	if (InshardMemory['creep'][creep.name]) {
	// 		creep.memory = InshardMemory['creep'][creep.name].MemoryData;
	// 		InshardMemory.creep[creep.name].state = 1;
	// 	}
	// 	return;
	// }
	if (!RoleData[creep.memory.role]) return;
	if (!creep.memory.bodynumber) {
		creep.memory.bodynumber = creep.body.length;
	}
	const roomName = creep.memory.belong;
	const add = creep.memory.bodynumber ?? 0;
	if (roomName) {
		// ensure container exists and safely increment
		globalThis.getBodyNum = globalThis.getBodyNum ?? {};
		globalThis.getBodyNum[roomName] = (globalThis.getBodyNum[roomName] ?? 0) + add;
	}
	// 自适应体型生产的爬虫执行恢复体型的相关逻辑
	{
		const roomName2 = creep.memory.belong;
		if (!(globalThis.Adaption?.[roomName2]) && creep.memory.adaption) {
			if (creep.store.getUsedCapacity() === 0) {
				const room = roomName2 ? Game.rooms[roomName2] : undefined;
				if (!room) return;
				const roleKey = creep.memory.role as keyof typeof RoleLevelData;
				const bodyData = RoleLevelData[roleKey][room.controller!.level].bodypart;
				const targetBodySum = (bodyData[0] ?? 0) + (bodyData[1] ?? 0) + (bodyData[2] ?? 0) + (bodyData[3] ?? 0) + (bodyData[4] ?? 0) + (bodyData[5] ?? 0) + (bodyData[6] ?? 0) + (bodyData[7] ?? 0);
				if (creep.body.length >= targetBodySum) {
					creep.memory.adaption = false;
				}
				if (!creep.memory.adaption) {
					const allSpawnenergy = CalculateEnergy(
						GenerateAbility(
							bodyData[0] ?? 0,
							bodyData[1] ?? 0,
							bodyData[2] ?? 0,
							bodyData[3] ?? 0,
							bodyData[4] ?? 0,
							bodyData[5] ?? 0,
							bodyData[6] ?? 0,
							bodyData[7] ?? 0
						)
					);
					if (bodyData && room.energyAvailable >= allSpawnenergy && (room.memory.SpawnList?.length ?? 0) <= 0) {
						creep.suicide();
						globalThis.Adaption = globalThis.Adaption ?? {};
						if (roomName2) globalThis.Adaption[roomName2] = true;
					}
				}
			}
		}
		/* adaption爬虫执行自S */
	}

	/* 非任务类型爬虫 */
	if (RoleData[creep.memory.role].fun) {
		RoleData[creep.memory.role].fun!(creep);
	} else {
		/* 任务类型爬虫 */
		creep.ManageMission();
	}

};
