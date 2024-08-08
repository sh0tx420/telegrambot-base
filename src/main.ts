import type { UserFromGetMe } from "grammy/types";  // Types

import path from "path";                            // stdlib

import { Bot } from "grammy";                       // 3rd-party deps

import { ReadJson } from "./utilities/json.ts";     // Utilities
import logging from "./utilities/logging.ts";

// Init config path and read config file
const cfgpath: string = path.resolve(__dirname, "..", "config.json");
const cfg = await ReadJson(cfgpath);

// Functions
async function OnStart(botInfo: UserFromGetMe): Promise<void> {
    if (cfg === undefined) {
        logging.error(`Failed to read json file: ${cfgpath}`);
        return;
    }

    for (const msg of [
        "Started bot!",
        `Name: ${botInfo.first_name} | User: @${botInfo.username} | ID: ${botInfo.id}`
    ]) {
        logging.info(msg);
    }
}

async function main(): Promise<void> {
    // Init bot
    if (cfg === undefined) {
        logging.error(`Failed to read json file: ${cfgpath}`);
        return;
    }

    const bot = new Bot(cfg.token);

    return;
}

await main();
