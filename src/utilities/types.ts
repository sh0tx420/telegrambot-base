// Custom types, interfaces, etc for the application

/* Types */
type BotCmdFunction = () => void;

/* Interfaces */
export interface ICommand {
    name: string,       // Name of command
    fn: BotCmdFunction  // The command function to execute when command is ran
}

// JSON interfaces
export interface IJSONConfig {
    token: string,      // String token of the bot
    debug: boolean      // Debug enabled?
}
