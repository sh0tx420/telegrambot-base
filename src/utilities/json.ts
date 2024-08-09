import {
    readFile, exists, writeFile
} from "fs/promises";               // stdlib

import logging from "./logging";    // Utilities

/**
 * Creates a JSON configuration file from a dict/JSON object.
 * 
 * @param fpath File path to create the file in
 * @param dict Dictionary/JSON object to copy into the file
 */
export async function CreateJsonFromDict(fpath: string, dict: any): Promise<void> {
    // Check if the JSON file exists
    const fileExists = await exists(fpath);
    if (!fileExists) {
        // Proceed to file creation
        await logging.info(`Configuration file ${fpath} does not exist, creating...`);

        try {
            // Convert the interface to JSON data for filling in empty data
            const data = JSON.stringify(dict, null, 4);

            // Create the file
            await writeFile(fpath, data, { encoding: "utf-8" });
        }
        catch (err: any) {
            await logging.error(`Failed to create file: ${err}`);
            return;
        }

        await logging.info("Successfully created configuration file.");
    }
}

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
        logging.warn(`Failed to read json file: ${fpath}`);
        return undefined;
    }
}
