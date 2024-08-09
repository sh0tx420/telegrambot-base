import type { Context } from "grammy"

export default {
    name: "help",
    async fn(ctx: Context, args: string[]) {
        ctx.reply("hi");
    }
}
