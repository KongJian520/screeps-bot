export const powerCreepRunner = function(pc: PowerCreep): void {
	let cpu_test = false;
	if (Memory.Systemswitch.Showtestpowercreep) {
		cpu_test = true;
	}
	const cpu_list: number[] = [];
	if (cpu_test) {
		cpu_list.push(Game.cpu.getUsed());
	}
	if (pc && pc.ticksToLive) pc.ManageMission();
	if (cpu_test) {
		cpu_list.push(Game.cpu.getUsed());
		console.log(pc.name, '总计' + (cpu_list[1] - cpu_list[0]).toFixed(3));
	}
};
