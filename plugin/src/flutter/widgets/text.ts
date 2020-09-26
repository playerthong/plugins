export class WidgetText {
    text: string
    textStyle: TextStyle
    constructor(text, args: {
        textStyle: TextStyle,
    }) {
        this.text = text;
        this.textStyle = args.textStyle
    }

    asWidget(): string {
        return `
Text(
    ${this.text},
    textStyle: ${this.textStyle.build()}
)
`
    }
}

export class TextStyle {
    constructor() { }
    build() {
        return "Theme.of(context).textStyle.body1";
    }
}