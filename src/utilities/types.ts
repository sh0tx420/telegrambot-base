// Custom types, interfaces, etc for the application
import type { Context } from "grammy";

/* Types */
type BotCmdFunction = (ctx: Context, args: string[]) => Promise<void>;

/* Interfaces */
export interface ICommand {
    name: string,       // Name of command
    fn: BotCmdFunction  // The command function to execute when command is ran
}

// JSON interfaces
export interface IJSONConfig {
    token: string,      // String token of the bot
    debug: boolean,     // Debug enabled?
    prefix: string      // Command prefix to use for the bot
}
