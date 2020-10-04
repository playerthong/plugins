import { AltBlendMixin, AltLayoutMixin, AltSceneNode } from "../../reflect-nodes/reflect-mixin";
import { numToAutoFixed } from "../../common/num-to-auto-fixed";
import { Opacity } from "flutter-builder/dist/widgets/opacity"
import { PrebuiltWidget } from "flutter-builder/dist/builder/prebuilt-widget";
import { Visibility } from "flutter-builder/dist/widgets/visibility";


/**
 * https://api.flutter.dev/flutter/widgets/Opacity-class.html
 */
export function flutterOpacity(node: AltBlendMixin, child: string): string {
  if (node.opacity !== undefined && node.opacity !== 1 && child !== "") {
    return new Opacity({
      opacity: node.opacity,
      child: new PrebuiltWidget(child)
    }).build().lookup({ withComma: true });
  }
  return child;
}

/**
 * https://api.flutter.dev/flutter/widgets/Visibility-class.html
 */
export function flutterVisibility(node: AltSceneNode,
  child: string): string {
  // [when testing] node.visible can be undefined
  if (node.visible !== undefined && node.visible === false && child !== "") {
    return new Visibility({
      visible: node.visible,
      child: new PrebuiltWidget(child)
    }).build().lookup({ withComma: true });
  }
  return child;
}

/**
 * https://api.flutter.dev/flutter/widgets/Transform-class.html
 * that's how you convert angles to clockwise radians: angle * -pi/180
 * using 3.14159 as Pi for enough precision and to avoid importing math lib.
 */
export function flutterRotation(node: AltLayoutMixin,
  child: string): string {
  if (node.rotation !== undefined &&
    child !== "" &&
    Math.round(node.rotation) !== 0) {
    return `Transform.rotate(angle: ${numToAutoFixed(
      node.rotation * (-3.14159 / 180)
    )}, child: ${child})`;
  }
  return child;
}
