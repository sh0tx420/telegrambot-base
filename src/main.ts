import type { UserFromGetMe } from "grammy/types";  // Types
import type { IJSONConfig } from "./utilities/types.ts";

import path from "path";                            // stdlib

import { Bot } from "grammy";                       // 3rd-party deps

import { ReadJson, CreateJsonFromDict } from "./utilities/json.ts";     // Utilities
import logging from "./utilities/logging.ts";
import HandleCommands from "./utilities/commands.ts";

// Init config path and read config file
let cfgPath: string;
let cfg: IJSONConfig;

// Functions
async function InitConfig(): Promise<boolean> {
    await logging.info("Initializing config...");

    cfgPath = path.resolve(__dirname, "..", "config.json");
    cfg = await ReadJson(cfgPath);

    if (cfg === undefined) {
        // Base config.json keys
        cfg = {
            token: "",
            debug: false,
            prefix: ""
        };
    
        await CreateJsonFromDict(cfgPath, cfg);
    }

    if (cfg.debug) {
        await logging.info("Starting in debug mode!");
    }

    

    // Fail initializing if config keys don't exist
    const keys1 = Object.keys(cfg);
    const keys2 = Object.keys(cfg);
    const bAllKeysExist = keys1.every(key => keys2.includes(key));
    
    if (!bAllKeysExist) {
        await logging.error("Missing key in config.json");
        return false;
    }

    // Fail initializing config if token doesn't exist
    if (cfg.token == "" || cfg.prefix == "") {    // Note: !cfg.token check might be useless
        await logging.error("Missing bot token or prefix in config file.");
        return false;
    }

    // After this, it's safe to read the file at any point
    return true;
}

async function OnStart(botInfo: UserFromGetMe): Promise<void> {
    for (const msg of [
        "Started bot!",
        `Name: ${botInfo.first_name} | User: @${botInfo.username} | ID: ${botInfo.id}`
    ]) {
        await logging.info(msg);
    }
}

async function main(): Promise<void> {
    // Init bot
    const bCfgInitSuccess = await InitConfig();

    if (!bCfgInitSuccess) {
        return; // Don't run any further
    }

    const bot = new Bot(cfg.token);

    await HandleCommands(bot);
    await bot.init();

    await bot.start({ onStart: OnStart });

    return;
}

await main();
