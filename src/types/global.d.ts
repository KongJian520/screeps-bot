export {};

type Queue<T> = T[];

declare global {
  interface GlobalThis {
    whoami?: string;
    Mounted?: boolean;
    CreepBodyData?: Record<string, Record<string, number[]>>;
    SpecialBodyData?: Record<string, Record<string, BodyPartConstant[]>>;
    CreepNumData?: Record<string, Record<string, number>>;
    ObserverData?: Record<string, { obtime: number; relateRooms: string[]; index: number; state: number; clearRooms: string[] }>;
    routeCache?: Record<string, string>;
    Gtime?: Record<string, number>;
    Stru?: Record<string, globalStrcutureData>;
    HostileCreeps?: Record<string, Record<string, Creep | undefined>>;
    HostileCreepsData?: Record<string, Record<string, unknown>>;
    HostilePowerCreeps?: Record<string, Record<string, PowerCreep | undefined>>;
    HostilePowerCreepsData?: Record<string, Record<string, unknown>>;
    MarketAveprice?: Record<string, PriceHistory[]>;
    MarketHighestprice?: Record<string, number>;
    HostileGroup?: Record<string, Record<string, any>>;
    HostileData?: Record<string, Record<string, any>>;
    HostileTowerData?: Record<string, Record<string, any>>;
    getStructure?: Record<string, Record<string, Structure | Structure[] | undefined>>;
    getStructureData?: Record<string, Record<string, unknown>>;
    getMission?: Record<string, Record<string, unknown>>;
    getBodyNum?: Record<string, number>;
    getBodyNumcache?: Record<string, number>;
    RoleMissionNum?: Record<string, Record<string, number>>;
    outMineEnemy?: Record<string, string[]>;
    ResourceLimit?: resourceLimitData;
    warData?: warData;
    MSB?: MissionSpecialBody;
    UsedCpu?: number;
    CpuData?: Queue<number>;
    BucketData?: Queue<number>;
    AveCpu?: number;
    Repairlist?: Record<string, string[]>;
    Marketorder?: Record<string, string[]>;
    controllerData?: Record<string, number[]>;
    RoomDataVisual?: string;
    Adaption?: Record<string, boolean>;
    RoomResource?: Record<string, object>;
    PowerDemand?: string[];
    roomStructsData?: Record<string, unknown>;
    initObserver?: boolean;
    betterMove?: unknown;
    frame?: unknown;
    outMoveRoom?: Record<string, object>;
    outMoveRoomboundary?: Record<string, object>;
    Stats?: unknown;
  }

}

