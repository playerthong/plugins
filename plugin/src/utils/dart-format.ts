import prettier from "prettier/standalone";
import java from "prettier-plugin-java"
// No dart formatter available for nodejs, using java format instead.
export function format(code: string): string {
    try {
        return prettier.format(code, {
            parser: "java",
            plugins: [java],
        });
    } catch (e) {
        console.error(e);
        return code;
    }
}