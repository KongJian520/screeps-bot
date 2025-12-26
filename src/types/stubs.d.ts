export {};

declare global {
  // Utility functions used in spawn/role calculations (declare minimal signatures)
  function CalculateEnergy(parts: BodyPartConstant[] | BodyPartConstant[][]): number;
  function GenerateAbility(...counts: number[]): BodyPartConstant[];

  // Extend RoomMemory with SpawnList used by the code
  interface RoomMemory {
    SpawnList?: unknown[];
  }
}
