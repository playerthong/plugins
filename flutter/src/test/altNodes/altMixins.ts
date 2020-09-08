// ALTSCENENODE
export type AltSceneNode =
  | AltFrameNode
  | AltGroupNode
  | AltRectangleNode
  | AltEllipseNode
  | AltTextNode;

export interface AltGeometryMixin {
  fills: ReadonlyArray<Paint> | PluginAPI["mixed"];
  strokes: ReadonlyArray<Paint>;
  strokeWeight: number;
  strokeMiterLimit: number;
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE";
  strokeCap: StrokeCap | PluginAPI["mixed"];
  strokeJoin: StrokeJoin | PluginAPI["mixed"];
  dashPattern: ReadonlyArray<number>;
  fillStyleId: string | PluginAPI["mixed"];
  strokeStyleId: string;
}

export interface AltCornerMixin {
  cornerRadius: number | PluginAPI["mixed"];
  cornerSmoothing: number;
}

export interface AltRectangleCornerMixin {
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
}

export interface AltBlendMixin {
  opacity: number;
  blendMode: BlendMode;
  isMask: boolean;
  effects: ReadonlyArray<Effect>;
  effectStyleId: string;
  visible: boolean;
  radius: number;
}

export interface AltLayoutMixin {
  x: number;
  y: number;
  rotation: number; // In degrees

  width: number;
  height: number;

  layoutAlign: "MIN" | "CENTER" | "MAX" | "STRETCH"; // applicable only inside auto-layout frames
}

export interface AltFrameMixin {
  layoutMode: "NONE" | "HORIZONTAL" | "VERTICAL";
  counterAxisSizingMode: "FIXED" | "AUTO"; // applicable only if layoutMode != "NONE"

  // horizontal and vertical were replaced by individual padding in each direction.
  // horizontalPadding: number; // applicable only if layoutMode != "NONE"
  // verticalPadding: number; // applicable only if layoutMode != "NONE"
  itemSpacing: number; // applicable only if layoutMode != "NONE"

  paddingRight: number;
  paddingLeft: number;
  paddingTop: number;
  paddingBottom: number;

  layoutGrids: ReadonlyArray<LayoutGrid>;
  gridStyleId: string;
  clipsContent: boolean;
  guides: ReadonlyArray<Guide>;
}
export class AltRectangleNode {
  readonly type = "RECTANGLE";
}
export class AltEllipseNode {
  readonly type = "ELLIPSE";
}
export class AltFrameNode {
  readonly type = "FRAME";
}
export class AltGroupNode {
  readonly type = "GROUP";
}
export class AltTextNode {
  readonly type = "TEXT";
}

export interface AltDefaultShapeMixin
  extends AltBaseNodeMixin,
    AltBlendMixin,
    AltGeometryMixin,
    AltRectangleCornerMixin,
    AltCornerMixin,
    AltLayoutMixin {}

export interface AltRectangleNode
  extends AltDefaultShapeMixin,
    AltCornerMixin,
    AltRectangleCornerMixin {}

export interface AltEllipseNode extends AltDefaultShapeMixin, AltCornerMixin {}

export interface AltFrameNode
  extends AltFrameMixin,
    AltBaseNodeMixin,
    AltChildrenMixin,
    AltGeometryMixin,
    AltCornerMixin,
    AltRectangleCornerMixin,
    AltBlendMixin,
    AltLayoutMixin {}

export interface AltGroupNode
  extends AltBaseNodeMixin,
    AltChildrenMixin,
    AltBlendMixin,
    AltLayoutMixin {}

// DOCUMENT

interface AltDocumentNode extends AltBaseNodeMixin, AltChildrenMixin {}

// PAGE
interface AltPageNode extends AltBaseNodeMixin, AltChildrenMixin {}

interface AltTextMixin {
  characters: string;
  textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT";

  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";

  paragraphIndent: number;
  paragraphSpacing: number;

  fontSize: number | PluginAPI["mixed"];
  fontName: FontName | PluginAPI["mixed"];
  textCase: TextCase | PluginAPI["mixed"];
  textDecoration: TextDecoration | PluginAPI["mixed"];
  letterSpacing: LetterSpacing | PluginAPI["mixed"];
  lineHeight: LineHeight | PluginAPI["mixed"];
}

export interface AltTextNode
  extends AltTextMixin,
    AltDefaultShapeMixin,
    AltBaseNodeMixin,
    AltLayoutMixin {}

export interface AltBaseNodeMixin {
  id: string;
  parent: (AltSceneNode & AltChildrenMixin) | null;
  name: string;
  pluginData: { [key: string]: string };

  // setPluginData(key: string, value: string): void;
  // getPluginData(key: string): string;
  // remove(): void;
}

export interface AltChildrenMixin {
  children: Array<AltSceneNode>;
  isRelative?: boolean;
}

// // DOCUMENT
// class AltDocumentNode {
//   type = "DOCUMENT";
//   children = [];
// }

// // PAGE
// class AltPageNode {
//   type = "PAGE";
//   children = [];
//   _selection: Array<SceneNode> = [];

//   get selection() {
//     return this._selection || [];
//   }

//   set selection(value) {
//     this._selection = value;
//   }
// }
