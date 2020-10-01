
import { convertIntoAltNode, convertIntoAltNodes } from "./reflect-nodes/reflect-conversion";
import { AltTextNode } from "./reflect-nodes/reflect-mixin";
import { getTextStyle } from "./flutter/flutter-text";
import { flutterMain } from "./flutter/main";
import { retrieveFlutterColors } from "./flutter/retrieveui/retrieve-colors";


let parentId: string;
let layerName = false;
let material = false;
let rawNode;

figma.showUI(__html__, { width: 450, height: 550 });

function run() {
    // ignore when nothing was selected
    if (figma.currentPage.selection.length === 0) {
        figma.ui.postMessage({
            type: "empty",
        });
        return;
    }

    // force to single selection
    // return false or raise error if more than one node is selected.
    if (figma.currentPage.selection.length >= 2) {
        figma.notify("only single selection is supported", {
            timeout: 1.5
        })
        return false;
    }

    // check [ignoreStackParent] description
    rawNode = figma.currentPage.selection[0]
    parentId = figma.currentPage.selection[0].parent?.id ?? "";

    let result = "";

    console.log("raw node")
    console.log(rawNode)

    const convertedSelection = convertIntoAltNode(
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
        data: retrieveFlutterColors([convertedSelection]),
    });
}

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

    if (msg.type == "randomize-selection") {
        randimizeText()
    }



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


// content randomizer, work on progress..
async function randimizeText() {
    if (figma.currentPage.selection.length >= 2) {
        figma.notify("only single node randomize is supported")
        return;
    }

    const primarySelection = figma.currentPage.selection[0]
    if (primarySelection.type == "TEXT") {
        const text = (primarySelection as TextNode)
        await figma.loadFontAsync(text.fontName as FontName);
        text.characters = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices scelerisque leo nec consectetur. Sed porta metus molestie sollicitudin gravida. Nulla vitae metus sapien."
    } if (primarySelection.type == "RECTANGLE" || primarySelection.type == "ELLIPSE") {
        const box = (primarySelection as RectangleNode)
        // box.fills[0] = 
        // figma.getImageByHash("")
        // figma.createImage()
    }
}