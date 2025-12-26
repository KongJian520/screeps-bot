
import { ErrorMapper } from "utils/ErrorMapper";
import "./interfaces/creep";
import { createApp } from "framework";


const app = createApp({ roomRunner, creepRunner });


export const loop = app.run;
