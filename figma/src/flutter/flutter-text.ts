import { commonLetterSpacing } from "../common/common-text-height-spacing";
import { FlutterDefaultBuilder } from "./flutter-default-builder";
import { AltTextNode } from "../reflect-nodes/reflect-mixin";
import { convertFontWeight } from "../utils/text-convert";
import { flutterColor } from "./builder/flutter-color";
import { numToAutoFixed } from "../common/num-to-auto-fixed";
import { getTextStyleById } from "../utils/figma-api-extended";
import { Theme } from "flutter-builder/dist/material/theme"
import { typographyIntelisenceMapping } from "../utils/constants";

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
  const textAlign = alignHorizontal !== "left"
    ? `textAlign: TextAlign.${alignHorizontal}, `
    : "";

  let text = node.characters;
  if (node.textCase === "LOWER") {
    text = text.toLowerCase();
  } else if (node.textCase === "UPPER") {
    text = text.toUpperCase();
  }
  // else if (node.textCase === "TITLE") {
  // TODO this
  // }
  const textStyle = getTextStyle(node);

  const style = textStyle ? `style: ${textStyle}, ` : "";

  const splittedChars = text.split("\n");
  const charsWithLineBreak = splittedChars.length > 1 ? splittedChars.join("\\n") : text;

  return `Text("${charsWithLineBreak}", ${textAlign}${style}), `;
}

/**
 * get the code of Text#style (text-style) via the name of the defined textstyle.
 * I.E, "H1" will give you "Theme.of(context).textTheme.headline1"
 * @param textStyleName 
 */
function getThemedTextStyleByName(textStyleName: string): string {
  for (const key of typographyIntelisenceMapping.keys()) {
    for (const canditate of typographyIntelisenceMapping.get(key)) {
      if (textStyleName.toLowerCase().includes(canditate)) {
        console.log(`the givven name ${textStyleName} matches with ${canditate}. themed style is.. ${key}`)
        return Theme.of().textStyle[key].build()
      }
    }
  }
}

export function getTextStyle(node: AltTextNode): string {

  try {
    const textStyle = getTextStyleById(node.textStyleId as string)
    console.log(`name of textstyle is... ${textStyle.name}`);
    const code = getThemedTextStyleByName(textStyle.name);
    return code;
  } catch (e) {
    console.log(`no textstyle for node ${node.name}. skipping to custom textStyle builder. (cannot use theme)`)
    console.error(e)
  }



  // example: text-md
  let styleBuilder = "";

  styleBuilder += flutterColor(node.fills);

  if (node.fontSize !== figma.mixed) {
    styleBuilder += `fontSize: ${numToAutoFixed(node.fontSize)}, `;
  }

  if (node.textDecoration === "UNDERLINE") {
    styleBuilder += "decoration: TextDecoration.underline, ";
  }

  if (node.fontName !== figma.mixed &&
    node.fontName.style.toLowerCase().match("italic")) {
    styleBuilder += "fontStyle: FontStyle.italic, ";
  }

  if (node.fontName !== figma.mixed) {
    styleBuilder += `fontFamily: "${node.fontName.family}", `;
  }

  if (node.fontName !== figma.mixed) {
    styleBuilder += `fontWeight: FontWeight.w${convertFontWeight(
      node.fontName.style
    )}, `;
  }

  // todo lineSpacing
  const letterSpacing = commonLetterSpacing(node);
  if (letterSpacing > 0) {
    styleBuilder += `letterSpacing: ${numToAutoFixed(letterSpacing)}, `;
  }

  return `TextStyle(${styleBuilder})`;
}

export function wrapTextAutoResize(node: AltTextNode,
  child: string): string {
  if (node.textAutoResize === "NONE") {
    // = instead of += because we want to replace it
    return `SizedBox(width: ${numToAutoFixed(
      node.width
    )}, height: ${numToAutoFixed(node.height)}, child: ${child}),`;
  } else if (node.textAutoResize === "HEIGHT") {
    // if HEIGHT is set, it means HEIGHT will be calculated automatically, but width won't
    // = instead of += because we want to replace it
    return `SizedBox(width: ${numToAutoFixed(node.width)}, child: ${child}),`;
  }

  return child;
}
