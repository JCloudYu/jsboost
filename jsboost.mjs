/**
 *	Author: JCloudYu
 *	Create: 2018/12/22
**/
import os from "os";

export const ___IS_WIN = ( os.platform().substring(0, 3) === "win" );
export * from "./jsboost-core.esm.js";
export * from "./lib/node/stream-reader.esm.js";
