import { T1Compound, T2Compound, T3Compound } from './ResourceConstant';

const ConsoleResources = {
	RES_T1: T1Compound,
	RES_T2: T2Compound,
	RES_T3: T3Compound
};

export default () => _.assign(global, ConsoleResources);
