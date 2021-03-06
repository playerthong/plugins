import { AltSceneNode } from "../../reflect-nodes/reflect-mixin";
import { numToAutoFixed } from "../../common/num-to-auto-fixed";
import { commonPadding } from "../../common/common-padding";

// Add padding if necessary!
// This must happen before Stack or after the Positioned, but not before.
export const flutterPadding = (node: AltSceneNode): string => {
  if (!("layoutMode" in node)) {
    return "";
  }

  const padding = commonPadding(node);
  if (!padding) {
    return "";
  }

  if ("all" in padding) {
    return `padding: const EdgeInsets.all(${numToAutoFixed(padding.all)}), `;
  }

  // horizontal and vertical, as the default AutoLayout
  if (
    padding.horizontal + padding.vertical !== 0 &&
    padding.top + padding.bottom + padding.left + padding.right === 0
  ) {
    const propHorizontalPadding =
      padding.horizontal > 0
        ? `horizontal: ${numToAutoFixed(padding.horizontal)}, `
        : "";

    const propVerticalPadding =
      padding.vertical > 0
        ? `vertical: ${numToAutoFixed(padding.vertical)}, `
        : "";

    return `padding: const EdgeInsets.symmetric(${propHorizontalPadding}${propVerticalPadding}), `;
  }

  let comp = "";

  // if left and right exists, verify if they are the same after [pxToLayoutSize] conversion.
  if (padding.left) {
    comp += `left: ${numToAutoFixed(padding.left)}, `;
  }
  if (padding.right) {
    comp += `right: ${numToAutoFixed(padding.right)}, `;
  }
  if (padding.top) {
    comp += `top: ${numToAutoFixed(padding.top)}, `;
  }
  if (padding.bottom) {
    comp += `bottom: ${numToAutoFixed(padding.bottom)}, `;
  }

  if (comp !== "") {
    return `padding: const EdgeInsets.only(${comp}), `;
  }

  return "";
};
