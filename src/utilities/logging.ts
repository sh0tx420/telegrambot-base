// Simple logging library
// prints nice text in console

// Colors for log functions
const col = {
    red: "\u001b[1;31;1m",
    green: "\u001b[1;32;1m",
    yellow: "\u001b[1;33;1m",
    white: "\u001b[0;1;37m",
    reset: "\u001b[0m"
}

// Export functions
export default {
    // funny troll: using process.stdout.write here instead of console.log
    
    /**
    * Print a INFO log with green text
    * 
    * @param text Text to print
    * @returns `true` if log was successful, `false` if failed to log.
    */
    info: async function(text: string): Promise<boolean> {
        return process.stdout.write(`${col.green}[INFO] ${col.white}${text}${col.reset}\n`);
    },

    /**
    * Print a ERROR log with red text
    * 
    * @param text Text to print
    * @returns `true` if log was successful, `false` if failed to log.
    */
    error: async function(text: string): Promise<boolean> {
        return process.stdout.write(`${col.red}[ERROR] ${col.white}${text}${col.reset}\n`);
    },

    /**
    * Print a DEBUG log with yellow text
    * 
    * @param text Text to print
    * @returns `true` if log was successful, `false` if failed to log.
    */
    debug: async function(text: string): Promise<boolean> {
        return process.stdout.write(`${col.yellow}[DEBUG] ${col.white}${text}${col.reset}\n`)
    },

    /**
    * Print a WARN log with yellow text
    * 
    * @param text Text to print
    * @returns `true` if log was successful, `false` if failed to log.
    */
    warn: async function(text: string): Promise<boolean> {
        return process.stdout.write(`${col.yellow}[WARN] ${col.white}${text}${col.reset}\n`)
    }
};
