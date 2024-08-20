import type { Context } from "grammy"

export default {
    name: "help",
    async fn(ctx: Context, args: string[]) {
        await ctx.reply("hi");
    }
}
