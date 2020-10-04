import { AltSceneNode } from "../../reflect-nodes/reflect-mixin";
import { rgbTo8hex } from "../../utils/color";
import { numToAutoFixed } from "../../common/num-to-auto-fixed";
import { Offset } from "flutter-builder/dist/dart-ui/offset"
import { BoxShadow } from "flutter-builder/dist/painting/box-shadow"

export function flutterBoxShadow(node: AltSceneNode): string {
  let propBoxShadow = "";
  if (node.effects?.length > 0) {
    const dropShadow: Array<ShadowEffect> = node.effects.filter(
      (d): d is ShadowEffect => d.type === "DROP_SHADOW" && d.visible !== false
    );

    if (dropShadow.length > 0) {
      let boxShadow = "";

      dropShadow.forEach((d: ShadowEffect) => {
        const color = `color: Color(0x${rgbTo8hex(d.color, d.color.a)}), `;
        const radius = `blurRadius: ${numToAutoFixed(d.radius)}, `;

        // TODO replace with this -> const offset = new Offset(d.offset.x, d.offset.y)
        const offset = `offset: Offset(${numToAutoFixed(
          d.offset.x
        )}, ${numToAutoFixed(d.offset.y)}), `;
        // TODO replace with this -> new BoxShadow()
        boxShadow += `BoxShadow(${color}${radius}${offset}),`;
      });

      propBoxShadow = `boxShadow: [ ${boxShadow} ], `;
    }
    // TODO inner shadow, layer blur
  }
  return propBoxShadow;
}

export function flutterElevationAndShadowColor(node: AltSceneNode): [string, string] {
  let elevation = "";
  let shadowColor = "";

  if (node.effects?.length > 0) {
    const dropShadow: Array<ShadowEffect> = node.effects.filter(
      (d): d is ShadowEffect => d.type === "DROP_SHADOW" && d.visible !== false
    );

    if (dropShadow.length > 0 && dropShadow[0].type === "DROP_SHADOW") {
      shadowColor = `color: Color(0x${rgbTo8hex(
        dropShadow[0].color,
        dropShadow[0].color.a
      )}), `;
      elevation = `elevation: ${numToAutoFixed(dropShadow[0].radius)}, `;
    }
  }

  return [elevation, shadowColor];
}
