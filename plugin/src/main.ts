import { showUI } from '@create-figma-plugin/utilities'

import { flutterMain } from "./flutter/flutterMain";
import { convertIntoAltNodes } from "./altNodes/altConversion";
import { retrieveFlutterColors } from "./flutter/retrieveUI/retrieveColors";


export default function () {
  const options = { width: 240, height: 300 }
  const data = { greeting: 'Hello, World!' }
  showUI(options, data)
}


let parentId: string;
let isJsx = false;
let layerName = false;
let material = true;



const run = () => {
  // ignore when nothing was selected
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
      type: "empty",
    });
    return;
  }

  // check [ignoreStackParent] description
  if (figma.currentPage.selection.length > 0) {
    parentId = figma.currentPage.selection[0].parent?.id ?? "";
  }

  let result = "";

  const convertedSelection = convertIntoAltNodes(
    figma.currentPage.selection,
    null
  );

  result = flutterMain(convertedSelection, parentId, material);
  console.log(result);

  figma.ui.postMessage({
    type: "result",
    data: result,
  });


  figma.ui.postMessage({
    type: "colors",
    data: retrieveFlutterColors(convertedSelection),
  });
};

figma.on("selectionchange", () => {
  console.log(figma.currentPage.exportAsync)
  run();
});



figma.ui.onmessage = (msg) => {
  console.log(`message : ${msg}`)
  if (msg.type === "jsx" && msg.data !== isJsx) {
    isJsx = msg.data;
    run();
  } else if (msg.type === "layerName" && msg.data !== layerName) {
    layerName = msg.data;
    run();
  } else if (msg.type === "material" && msg.data !== material) {
    material = msg.data;
    run();
  }
};
