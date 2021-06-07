figma.showUI(__html__, {
    width: 400,
    height: 500
})

const emFactor = 16;

figma.on("selectionchange", ()=>{
    figma.ui.postMessage({type:"get-em-values-for-selectedElements"});
    sendDataAboutThings()
})

figma.on("currentpagechange", ()=>{
    figma.ui.postMessage({type:"get-em-values-for-selectedElements"})
    sendDataAboutThings()
})

figma.on("currentpagechange", ()=>{
    figma.ui.postMessage({type:"get-em-values-for-selectedElements"})
    sendDataAboutThings()
});

const basicValues = [
    "x", 
    "y", 
    "width", 
    "height", 
    "fontSize", 
    "cornerRadius",
    "strokeWeight",
    "bottomLeftRadius",
    "bottomRightRadius",
    "topRightRadius",
    "topLeftRadius",
];

const sendDataAboutThings = () => {
    try{
        const values = figma.currentPage.selection.map((node)=>{
            const emsValues = basicValues
                .filter(key=> typeof node[key] === "number")
                .map(key=>{
                    return {
                        key,
                        pxValue: node[key],
                        emValue: node[key] / emFactor,
                        type: node.type,
                        name: node.name,
                        id: node.id
                    }
                })
            const {name, id, type} = node;
            const lineHeightObj = (node.type==="TEXT" && node?.lineHeight?.unit !== "AUTO" && typeof node?.lineHeight?.value === "number")?({
                key:"lineHeight",
                pxValue: node?.lineHeight?.value,
                emValue: node?.lineHeight?.value / emFactor,
                type: node.type,
                name: node.name,
                id: node.id
            }):null;

            const objFinal = {
                name, 
                id, 
                type, 
                values: lineHeightObj?[
                    ...emsValues,
                    lineHeightObj
                ]:emsValues
            }
            return objFinal;
        })

        figma.ui.postMessage({type:"return-em-values-for-selectedElements", payload: values})

        // window.postMessage(
        //     { 
        //         pluginMessage: { 
        //             type: 'return-em-values-for-selectedElements', 
        //             payload: values 
        //         } 
        //     }, 
        //     "*"
        // )
    } catch (e) {
        console.error(e);
    }
}

figma.ui.onmessage = msg => {
    
    // if (msg.type === 'create-rectangles') {
    //     const nodes = []

    //     for (let i = 0; i < msg.count; i++) {
    //         const rect = figma.createRectangle()
    //         rect.x = i * 150
    //         rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }]
    //         figma.currentPage.appendChild(rect)
    //         nodes.push(rect)
    //     }

    //     figma.currentPage.selection = nodes
    //     figma.viewport.scrollAndZoomIntoView(nodes)
    // }

    // figma.closePlugin()

    if (msg.type === "get-em-values-for-selectedElements") {
        try{
            const values = figma.currentPage.selection.map((node)=>{
                const emsValues = Object.keys(node)
                    .filter(key=> typeof node[key] === "number")
                    .map(key=>({
                        key,
                        pxValue: node[key],
                        emValue: node[key] / emFactor,
                        type: node.type,
                        name: node.name
                    }))
                return emsValues;
            })
    
            window.postMessage(
                { 
                    pluginMessage: { 
                        type: 'return-em-values-for-selectedElements', 
                        payload: values 
                    } 
                }, 
                "*"
            )
        } catch (e) {
            console.error(e);
        }
        
    }
}