import { convertIntoAltNodes } from "./altnodes/altconversion";
import { flutterMain } from "./flutter/main";
import { retrieveFlutterColors } from "./flutter/retrieveui/retrieve-colors";


let parentId: string;
let layerName = false;
let material = true;

figma.showUI(__html__, { width: 450, height: 550 });

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

    // @ts-ignore
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
    run();
});

// efficient? No. Works? Yes.
// todo pass data instead of relying in types
figma.ui.onmessage = (msg) => {
    // region test
    if (msg.type === 'create-rectangles') {
        const nodes = []
        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle()
            rect.x = i * 150
            rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
            figma.currentPage.appendChild(rect)
            nodes.push(rect)
        }
        figma.currentPage.selection = nodes
        figma.viewport.scrollAndZoomIntoView(nodes)
    }
    // endregion test
    if (msg.type === "flutter") {
        run();
    } else if (msg.type === "layerName" && msg.data !== layerName) {
        layerName = msg.data;
        run();
    } else if (msg.type === "material" && msg.data !== material) {
        material = msg.data;
        run();
    }
};
