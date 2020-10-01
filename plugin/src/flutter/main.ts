import {
  AltEllipseNode,
  AltFrameNode,
  AltRectangleNode,
  AltGroupNode,
  AltTextNode,
} from "../alt-nodes/altmixins";
import { FlutterDefaultBuilder } from "./flutter-default-builder";
import { AltSceneNode } from "../alt-nodes/altmixins";
import { FlutterTextBuilder } from "./flutter-text";
import { numToAutoFixed } from "../common/num-to-auto-fixed";
import { mostFrequent } from "../utils/array-utils";

let parentId = "";
let material = false;
const DEFAULT_COMPONENT_NAME = "Component";
/// MAIN
export function flutterMain(sceneNode: AltSceneNode,
  parentIdSrc: string = "",
  isMaterial: boolean = false): string {
  parentId = parentIdSrc;
  material = isMaterial;

  let result = flutterWidgetGenerator(sceneNode);
  // clean the code. -> this will be merged inside flutter-builder's logic. for now, leave it here.
  if (result.endsWith(", ") || result.endsWith(",")) {
    result = result.trimEnd();
    result = result.replace(/.$/, ";")
  }

  // add function wrapper
  result = `
class ${DEFAULT_COMPONENT_NAME} extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return ${result}
  }
}
  `
  return result
}

// todo lint idea: replace BorderRadius.only(topleft: 8, topRight: 8) with BorderRadius.horizontal(8)
function flutterWidgetGenerator(sceneNode: ReadonlyArray<AltSceneNode> | AltSceneNode): string {
  let componentFlutterCode = "";


  if (Array.isArray(sceneNode)) {
    console.log("flutterWidgetGenerator:: targetting list of nodes")
    sceneNode = sceneNode as ReadonlyArray<AltSceneNode>
    const sceneLen = sceneNode.length;

    sceneNode.forEach((node, index) => {
      handleNode(node)
      // if the parent is an AutoLayout, and itemSpacing is set, add a SizedBox between items.
      // on else, comp += ""
      componentFlutterCode += addSpacingIfNeeded(node, index, sceneLen);
    });
  } else {
    console.log("flutterWidgetGenerator:: targetting single node")
    console.log(sceneNode)
    sceneNode = sceneNode as AltSceneNode
    handleNode(sceneNode)
  }


  function handleNode(node: AltSceneNode) {
    console.log(`starting handling node of ${node.name} type of ${node.type}`)
    if (node.type === "RECTANGLE" || node.type === "ELLIPSE") {
      componentFlutterCode += flutterContainer(node, "");
    }

    //  else if (node.type === "VECTOR") {
    // comp = flutterVector(node);
    // }
    else if (node.type === "GROUP") {
      componentFlutterCode += flutterGroup(node);
    } else if (node.type === "FRAME") {
      componentFlutterCode += flutterFrame(node);
    } else if (node.type === "TEXT") {
      componentFlutterCode += flutterText(node);
    }
  }


  return componentFlutterCode;
}

function flutterGroup(node: AltGroupNode): string {
  return flutterContainer(
    node,
    `Stack(children:[${flutterWidgetGenerator(node.children)}],),`
  );
}

function flutterContainer(node: AltFrameNode | AltGroupNode | AltRectangleNode | AltEllipseNode,
  child: string): string {
  const builder = new FlutterDefaultBuilder(child);

  builder
    .createContainer(node, material)
    .blendAttr(node)
    .position(node, parentId);

  return builder.child;
}

function flutterText(node: AltTextNode): string {
  const builder = new FlutterTextBuilder();

  builder
    .createText(node)
    .blendAttr(node)
    .textAutoSize(node)
    .position(node, parentId);

  return builder.child;
}

function flutterFrame(node: AltFrameNode): string {
  const children = flutterWidgetGenerator(node.children);

  if (node.children.length === 1) {
    // if there is only one child, there is no need for Container or Row. Padding works indepdently of them.
    return flutterContainer(node, children);
  } else if (node.layoutMode !== "NONE") {
    const rowColumn = makeRowColumn(node, children);
    return flutterContainer(node, rowColumn);
  } else {
    // node.layoutMode === "NONE" && node.children.length > 1
    // children needs to be absolute
    return flutterContainer(node, `Stack(children:[${children}],),`);
  }
}

function makeRowColumn(node: AltFrameNode, children: string): string {
  // ROW or COLUMN
  const rowOrColumn = node.layoutMode === "HORIZONTAL" ? "Row" : "Column";

  const mostFreq = mostFrequent(node.children.map((d) => d.layoutAlign));

  const layoutAlign = mostFreq === "MIN" ? "start" : "center";

  // FIXME comma
  const crossAxisColumn = rowOrColumn === "Column"
    ? `crossAxisAlignment: CrossAxisAlignment.${layoutAlign}, `
    : "";

  // FIXME comma
  const mainAxisSize = "mainAxisSize: MainAxisSize.min, ";

  // FIXME comma
  return `${rowOrColumn}(${mainAxisSize}${crossAxisColumn}children:[${children}], ), `;
}


// TODO Vector support in Flutter is complicated. Currently, AltConversion converts it in a Rectangle.
function addSpacingIfNeeded(node: AltSceneNode,
  index: number,
  len: number): string {
  if (node.parent?.type === "FRAME" && node.parent.layoutMode !== "NONE") {
    // check if itemSpacing is set and if it isn't the last value.
    // Don't add the SizedBox at last value. In Figma, itemSpacing CAN be negative; here it can't.
    if (node.parent.itemSpacing > 0 && index < len - 1) {
      if (node.parent.layoutMode === "HORIZONTAL") {
        // FIXME comma
        return ` SizedBox(width: ${numToAutoFixed(node.parent.itemSpacing)}),`;
      } else {
        // FIXME comma
        // node.parent.layoutMode === "VERTICAL"
        return ` SizedBox(height: ${numToAutoFixed(node.parent.itemSpacing)}),`;
      }
    }
  }
  return "";
}
