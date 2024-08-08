import typescriptParser from "@typescript-eslint/parser";
import tsplugin from "@typescript-eslint/eslint-plugin"

export default [
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: typescriptParser
        },
        plugins: {
            typescript: tsplugin
        },
        rules: {
            "semi": ["warn", "always"]
        }
    }
]
