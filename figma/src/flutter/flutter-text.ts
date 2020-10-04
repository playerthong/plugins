import { commonLetterSpacing } from "../common/common-text-height-spacing";
import { FlutterDefaultBuilder } from "./flutter-default-builder";
import { AltTextNode } from "../reflect-nodes/reflect-mixin";
import { convertFontWeight } from "../utils/text-convert";
import { flutterColor } from "./builder/flutter-color";
import { numToAutoFixed } from "../common/num-to-auto-fixed";
import { getTextStyleById } from "../utils/figma-api-extended";
import { Theme } from "flutter-builder/dist/material/theme"
import { typographyIntelisenceMapping } from "../utils/constants";
import { SizedBox, Text } from "flutter-builder/dist/widgets";
import { TextStyle } from "flutter-builder/dist/painting/text-style";
import { FontWeight } from "flutter-builder/dist/dart-ui/font-weight";
import { FontStyle } from "flutter-builder/dist/dart-ui/font-style";
import { TextDecoration } from "flutter-builder/dist/dart-ui/text-decoration";
import { TextAlign } from "flutter-builder/dist/dart-ui/text-align";

export class FlutterTextBuilder extends FlutterDefaultBuilder {
  constructor(optChild: string = "") {
    super(optChild);
  }

  reset(): void {
    this.child = "";
  }

  createText(node: AltTextNode): this {
    this.child = makeTextComponent(node);
    return this;
  }

  textAutoSize(node: AltTextNode): this {
    this.child = wrapTextAutoResize(node, this.child);
    return this;
  }
}

export function makeTextComponent(node: AltTextNode): string {
  // only undefined in testing
  let alignHorizontal = node.textAlignHorizontal?.toString()?.toLowerCase() ?? "left";
  alignHorizontal =
    alignHorizontal === "justified" ? "justify" : alignHorizontal;


  // todo if layoutAlign !== MIN, Text will be wrapped by Align
  // if alignHorizontal is LEFT, don't do anything because that is native
  const textAlign = TextAlign[alignHorizontal]

  //#region get text content
  let text = node.characters;
  if (node.textCase === "LOWER") {
    text = text.toLowerCase();
  } else if (node.textCase === "UPPER") {
    text = text.toUpperCase();
  }
  // else if (node.textCase === "TITLE") {
  // TODO this
  // }
  const splittedChars = text.split("\n");
  const charsWithLineBreak = splittedChars.length > 1 ? splittedChars.join("\\n") : text;
  //#endregion

  const textStyle = getTextStyle(node);

  // const style = textStyle ? `style: ${textStyle.build().lookup()}, ` : "";

  return new Text(charsWithLineBreak, {
    style: textStyle,
    textAlign: textAlign
  }).build().lookup() + ","
}

/**
 * get the code of Text#style (text-style) via the name of the defined textstyle.
 * I.E, "H1" will give you "Theme.of(context).textTheme.headline1"
 * @param textStyleName 
 */
function getThemedTextStyleByName(textStyleName: string): TextStyle {
  for (const key of typographyIntelisenceMapping.keys()) {
    for (const canditate of typographyIntelisenceMapping.get(key)) {
      if (textStyleName.toLowerCase().includes(canditate)) {
        console.log(`the givven name ${textStyleName} matches with ${canditate}. themed style is.. ${key}`)
        return Theme.of().textStyle[key]
      }
    }
  }
}

export function getTextStyle(node: AltTextNode): TextStyle {
  try {
    const textStyle = getTextStyleById(node.textStyleId as string)
    console.log(`name of textstyle is... ${textStyle.name}`);
    return getThemedTextStyleByName(textStyle.name);
  } catch (e) {
    console.log(`no textstyle for node ${node.name}. skipping to custom textStyle builder. (cannot use theme)`)
    console.error(e)
  }

  let fontSize: number
  if (node.fontSize !== figma.mixed) {
    fontSize = node.fontSize
  }

  let decoration: TextDecoration
  console.error(node.textDecoration)
  if (node.textDecoration === "UNDERLINE") {
    decoration = TextDecoration.underline;
  }

  let fontStyle: FontStyle
  if (node.fontName !== figma.mixed &&
    node.fontName.style.toLowerCase().match("italic")) {
    fontStyle = FontStyle.italic
  }

  let fontFamily: string
  if (node.fontName !== figma.mixed) {
    fontFamily = node.fontName.family;
  }

  let fontWeight: FontWeight;
  if (node.fontName !== figma.mixed) {
    fontWeight = FontWeight[`w${convertFontWeight(node.fontName.style)}`]
  }

  let letterSpacing: number
  if (letterSpacing > 0) {
    letterSpacing = commonLetterSpacing(node);
  }

  // TODO lineSpacing
  // TODO color - flutterColor(node.fills)

  return new TextStyle(
    {
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      fontStyle: fontStyle,
      letterSpacing: letterSpacing,
      decoration: decoration,
    }
  )
}

export function wrapTextAutoResize(node: AltTextNode,
  child: string): string {
  if (node.textAutoResize === "NONE") {
    // = instead of += because we want to replace it

    // TODO refactor with this
    new SizedBox({
      child: child as any,
      width: node.width,
      height: node.height
    });

    // TODO remove
    return `SizedBox(width: ${numToAutoFixed(
      node.width
    )}, height: ${numToAutoFixed(node.height)}, child: ${child}),`;
  } else if (node.textAutoResize === "HEIGHT") {
    // if HEIGHT is set, it means HEIGHT will be calculated automatically, but width won't
    // = instead of += because we want to replace it
    // TODO refactor with this
    new SizedBox({
      child: child as any,
      width: node.width
    })

    // TODO remove
    return `SizedBox(width: ${numToAutoFixed(node.width)}, child: ${child}),`;
  }

  return child;
}
