import { flutterElevationAndShadowColor } from "./builder/flutter-shadow";
import { AltSceneNode } from "../alt-nodes/altmixins";
import { flutterSize } from "./builder/flutter-size";
import { flutterPadding } from "./builder/flutter-padding";
import { flutterShape, flutterBorderRadius } from "./builder/flutter-border";
import {
  AltRectangleNode,
  AltEllipseNode,
  AltFrameNode,
} from "../alt-nodes/altmixins";
import { flutterColor } from "./builder/flutter-color";

// https://api.flutter.dev/flutter/material/Material-class.html
export function flutterMaterial(node: AltRectangleNode | AltEllipseNode | AltFrameNode,
  child: string): string {
  // ignore the view when size is zero or less
  // while technically it shouldn't get less than 0, due to rounding errors,
  // it can get to values like: -0.000004196293048153166
  if (node.width <= 0 || node.height <= 0) {
    return child;
  }

  const color = materialColor(node);
  const shape = materialShape(node);
  const clip = getClipping(node);
  const [elevation, shadowColor] = flutterElevationAndShadowColor(node);
  const padChild = child ? `child: ${getPadding(node, child)}` : "";

  const materialAttr = color + elevation + shadowColor + shape + clip + padChild;

  const material = `\nMaterial(${materialAttr}), `;

  const containerAttr = flutterSize(node);

  if (containerAttr) {
    return `Container(${containerAttr}child: ${material}), `;
  }

  return material;
}

function materialColor(node: AltRectangleNode | AltEllipseNode | AltFrameNode): string {
  const color = flutterColor(node.fills);
  if (!color) {
    return "color: Colors.transparent, ";
  }
  return color;
}

function materialShape(node: AltRectangleNode | AltEllipseNode | AltFrameNode): string {
  if (node.type === "ELLIPSE" || node.strokes?.length > 0) {
    return flutterShape(node);
  } else {
    return flutterBorderRadius(node);
  }
}

function getClipping(node: AltSceneNode): string {
  let clip = false;
  if (node.type === "FRAME" && node.cornerRadius && node.cornerRadius !== 0) {
    clip = node.clipsContent;
  }
  return clip ? "clipBehavior: Clip.antiAlias, " : "";
}

function getPadding(node: AltFrameNode | AltEllipseNode | AltRectangleNode,
  child: string): string {
  const padding = flutterPadding(node);
  if (padding) {
    return `Padding(${padding}), child: ${child}), `;
  }

  return child;
}
