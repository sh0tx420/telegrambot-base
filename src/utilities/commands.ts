import type { ICommand } from "./types";    // Types
import type { Context } from "grammy";

import path from "path";                    // stdlib
import fs from "fs/promises";

import { Bot } from "grammy";               // 3rd-party deps

import logging from "./logging";            // Utilities


/* Functions */

/**
 * Dynamically load all .ts files from commands/ directory
 * and push them to the `cmds` array
 * 
 * @param cmds Where to store the commands
 */
async function ImportCommands(cmds: ICommand[]): Promise<void> {
    const commandsPath = path.join(__dirname, "..", "commands");
    const commandFiles = await fs.readdir(commandsPath);

    // NOTE: idea from discord.js, load commands by category
    // I'll do it if anyone requests it. -sh0tx

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command: ICommand = await import(filePath).then(module => module.default || module);

        cmds.push({ name: command.name, fn: command.fn });

        // TODO: Add check here or in the log function itself to check if
        // the debug mode is enabled
        await logging.debug(`Loading command: ${command.name}`);
    }

    await logging.debug(`Loaded ${cmds.length}/${commandFiles.length} commands`);
}

/**
 * Create commands, handle cooldowns and whitelisting.
 * 
 * @param bot grammY Bot class
 */
export default async function HandleCommands(bot: Bot): Promise<void> {
    const cmds: ICommand[] = [];

    // Add commands from commands/ folder to 'cmds' array
    await ImportCommands(cmds);

    // Listen to message event
    bot.on("msg", async (ctx: Context) => {
        if (!ctx.from || !ctx.message)
            return;

        // TODO: allow multiple prefixes
        if (!ctx.message.text?.startsWith("."))
            return; // Ignore message if it doesn't start with cmd prefix

        // Command logic
        const userId = ctx.from.id;

        const args = ctx.message.text.slice(1).trim().split(" ");
        const cmdName = args.shift()?.toLowerCase();

        // Find command from cmd list by name
        const cmd = cmds.find(cmd => cmd.name === cmdName);

        if (cmd) {
            await cmd.fn(ctx, args);
        }
    });
}
