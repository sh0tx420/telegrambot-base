import { readFile } from "fs/promises";
import logging from "./logging";

/**
 * Reads a JSON configuration file from a path.
 * 
 * @param fpath File path to read from
 * @returns JSON object of the configuration file
 */
export async function ReadJson(fpath: string): Promise<any> {
    try {
        const cfgfile: string = await readFile(fpath, { encoding: "utf-8" });
        return JSON.parse(cfgfile);
    }
    catch (err: any) {
        logging.error(err);
        return undefined;
    }
}
