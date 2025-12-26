// Prototype extensions for Creep
export { };
declare global {
    interface CreepMemory {
        belong: string; // 爬爬所属房间
        role: string; // 爬虫角色
        targetID?: Id<any>; // 爬爬目标ID
        working: boolean; // 爬爬工作状态
        workpos?: { x: number; y: number; roomName: string } | RoomPosition; // 爬爬工作位置
        Rerunt?: number; /*爬的重启时间*/

        bodynumber?: number; // 爬爬身体部件数量
        adaption?: boolean; // 自适应标记
        MissionData?: any; // 任务数据占位，实际结构根据项目定义
    }
    interface Creep {
        isFull(): boolean;
        isEmpty(): boolean;
        moveIfNotInRange(target: RoomObject | RoomPosition | { pos: RoomPosition } | RoomPosition, range?: number): Creep;
        ManageMission(): void;
    }
}



