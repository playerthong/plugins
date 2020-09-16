import { convertNodesOnRectangle } from "./convertNodesOnRectangle";
import {
  AltSceneNode,
  AltRectangleNode,
  AltFrameNode,
  AltTextNode,
  AltGroupNode,
  AltLayoutMixin,
  AltFrameMixin,
  AltGeometryMixin,
  AltBlendMixin,
  AltCornerMixin,
  AltRectangleCornerMixin,
  AltDefaultShapeMixin,
  AltEllipseNode,
} from "./altMixins";
import { convertToAutoLayout } from "./convertToAutoLayout";

export const convertSingleNodeToAlt = (
  node: SceneNode,
  parent: AltFrameNode | AltGroupNode | null = null
): AltSceneNode => {
  return convertIntoAltNodes([node], parent)[0];
};

export const frameNodeToAlt = (
  node: FrameNode | InstanceNode | ComponentNode,
  altParent: AltFrameNode | AltGroupNode | null = null
): AltRectangleNode | AltFrameNode | AltGroupNode => {
  if (node.children.length === 0) {
    // if it has no children, convert frame to rectangle
    return frameToRectangleNode(node, altParent);
  }

  const altNode = new AltFrameNode();

  altNode.id = node.id;
  altNode.name = node.name;

  if (altParent) {
    altNode.parent = altParent;
  }

  convertDefaultShape(altNode, node);
  convertFrame(altNode, node);
  convertCorner(altNode, node);
  convertRectangleCorner(altNode, node);

  altNode.children = convertIntoAltNodes(node.children, altNode);

  return convertToAutoLayout(convertNodesOnRectangle(altNode));
};

// auto convert Frame to Rectangle when Frame has no Children
const frameToRectangleNode = (
  node: FrameNode | InstanceNode | ComponentNode,
  altParent: AltFrameNode | AltGroupNode | null
): AltRectangleNode => {
  const newNode = new AltRectangleNode();

  newNode.id = node.id;
  newNode.name = node.name;

  if (altParent) {
    newNode.parent = altParent;
  }

  convertDefaultShape(newNode, node);
  convertRectangleCorner(newNode, node);
  convertCorner(newNode, node);
  return newNode;
};

export const convertIntoAltNodes = (
  sceneNode: ReadonlyArray<SceneNode>,
  altParent: AltFrameNode | AltGroupNode | null = null
): Array<AltSceneNode> => {
  const mapped: Array<AltSceneNode | null> = sceneNode.map(
    (node: SceneNode) => {
      if (node.type === "RECTANGLE" || node.type === "ELLIPSE") {
        let altNode;
        if (node.type === "RECTANGLE") {
          altNode = new AltRectangleNode();
          convertRectangleCorner(altNode, node);
        } else {
          altNode = new AltEllipseNode();
        }

        altNode.id = node.id;
        altNode.name = node.name;

        if (altParent) {
          altNode.parent = altParent;
        }

        convertDefaultShape(altNode, node);
        convertCorner(altNode, node);

        return altNode;
      } else if (
        node.type === "FRAME" ||
        node.type === "INSTANCE" ||
        node.type === "COMPONENT"
      ) {
        return frameNodeToAlt(node, altParent);
      } else if (node.type === "GROUP") {
        if (node.children.length === 1 && node.visible !== false) {
          // if Group is visible and has only one child, Group should disappear.
          // there will be a single value anyway.
          return convertIntoAltNodes(node.children, altParent)[0];
        }

        const altNode = new AltGroupNode();

        altNode.id = node.id;
        altNode.name = node.name;

        if (altParent) {
          altNode.parent = altParent;
        }

        convertLayout(altNode, node);
        convertBlend(altNode, node);

        altNode.children = convertIntoAltNodes(node.children, altNode);

        // try to find big rect and regardless of that result, also try to convert to autolayout.
        // There is a big chance this will be returned as a Frame
        // also, Group will always have at least 2 children.
        return convertNodesOnRectangle(altNode);
      } else if (node.type === "TEXT") {
        const altNode = new AltTextNode();

        altNode.id = node.id;
        altNode.name = node.name;

        if (altParent) {
          altNode.parent = altParent;
        }

        convertDefaultShape(altNode, node);
        convertIntoAltText(altNode, node);
        return altNode;
      } else if (node.type === "VECTOR") {
        const altNode = new AltRectangleNode();
        altNode.id = node.id;
        altNode.name = node.name;

        if (altParent) {
          altNode.parent = altParent;
        }

        convertDefaultShape(altNode, node);

        // Vector support is still missing. Meanwhile, add placeholder.
        altNode.radius = 16;
        altNode.opacity = 0.5;

        return altNode;
      }

      return null;
    }
  );

  return mapped.filter(notEmpty);
};

const convertLayout = (altNode: AltLayoutMixin, node: LayoutMixin) => {
  altNode.x = node.x;
  altNode.y = node.y;
  altNode.width = node.width;
  altNode.height = node.height;
  altNode.rotation = node.rotation;
  altNode.layoutAlign = node.layoutAlign;
};

const convertFrame = (altNode: AltFrameMixin, node: DefaultFrameMixin) => {
  altNode.layoutMode = node.layoutMode;
  altNode.counterAxisSizingMode = node.counterAxisSizingMode;

  altNode.paddingLeft = node.horizontalPadding;
  altNode.paddingRight = node.horizontalPadding;
  altNode.paddingTop = node.verticalPadding;
  altNode.paddingBottom = node.verticalPadding;

  altNode.itemSpacing = node.itemSpacing;
  altNode.layoutGrids = node.layoutGrids;
  altNode.gridStyleId = node.gridStyleId;
  altNode.clipsContent = node.clipsContent;
  altNode.guides = node.guides;
};

const convertGeometry = (altNode: AltGeometryMixin, node: GeometryMixin) => {
  altNode.fills = node.fills;
  altNode.strokes = node.strokes;
  altNode.strokeWeight = node.strokeWeight;
  altNode.strokeMiterLimit = node.strokeMiterLimit;
  altNode.strokeAlign = node.strokeAlign;
  altNode.strokeCap = node.strokeCap;
  altNode.strokeJoin = node.strokeJoin;
  altNode.dashPattern = node.dashPattern;
  altNode.fillStyleId = node.fillStyleId;
  altNode.strokeStyleId = node.strokeStyleId;
};

const convertBlend = (
  altNode: AltBlendMixin,
  node: BlendMixin & SceneNodeMixin
) => {
  altNode.opacity = node.opacity;
  altNode.blendMode = node.blendMode;
  altNode.isMask = node.isMask;
  altNode.effects = node.effects;
  altNode.effectStyleId = node.effectStyleId;

  altNode.visible = node.visible;
};

const convertDefaultShape = (
  altNode: AltDefaultShapeMixin,
  node: DefaultShapeMixin
) => {
  // opacity, visible
  convertBlend(altNode, node);

  // fills, storkes
  convertGeometry(altNode, node);

  // width, x, y
  convertLayout(altNode, node);
};

const convertCorner = (altNode: AltCornerMixin, node: CornerMixin) => {
  altNode.cornerRadius = node.cornerRadius;
  altNode.cornerSmoothing = node.cornerSmoothing;
};

const convertRectangleCorner = (
  altNode: AltRectangleCornerMixin,
  node: RectangleCornerMixin
) => {
  altNode.topLeftRadius = node.topLeftRadius;
  altNode.topRightRadius = node.topRightRadius;
  altNode.bottomLeftRadius = node.bottomLeftRadius;
  altNode.bottomRightRadius = node.bottomRightRadius;
};

const convertIntoAltText = (altNode: AltTextNode, node: TextNode) => {
  altNode.textAlignHorizontal = node.textAlignHorizontal;
  altNode.textAlignVertical = node.textAlignVertical;
  altNode.paragraphIndent = node.paragraphIndent;
  altNode.paragraphSpacing = node.paragraphSpacing;
  altNode.fontSize = node.fontSize;
  altNode.fontName = node.fontName;
  altNode.textCase = node.textCase;
  altNode.textDecoration = node.textDecoration;
  altNode.letterSpacing = node.letterSpacing;
  altNode.textAutoResize = node.textAutoResize;
  altNode.characters = node.characters;
  altNode.lineHeight = node.lineHeight;
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
