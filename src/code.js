import { actionTypes } from "./flux/actionTypes";
import { getData, returnData } from "./flux/actions";
import { emFactor, basicValues, modalSize } from "./conf/basicValues"

figma.showUI(__html__.main, modalSize )
figma.showUI(__html__.about, modalSize )

figma.on("selectionchange", ()=>{
    sendDataAboutThings()
})

figma.on("currentpagechange", ()=>{
    sendDataAboutThings()
})

figma.on("currentpagechange", ()=>{
    sendDataAboutThings()
});

/**
 * 
 */
const sendDataAboutThings = () => {
    try{
        const values = figma.currentPage.selection
            .map((node)=>{
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
                    });
                
                const {
                    name, 
                    id, 
                    type
                } = node;
                
                const lineHeightObj = (
                        node.type==="TEXT" && 
                        node?.lineHeight?.unit !== "AUTO" && 
                        typeof node?.lineHeight?.value === "number"
                    )?({
                        key:"lineHeight",
                        pxValue: node?.lineHeight?.value,
                        emValue: node?.lineHeight?.value / emFactor,
                        type: node.type,
                        name: node.name,
                        id: node.id
                    }):
                    null;

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

        // figma.ui.postMessage({
        //     type:"return-em-values-for-selectedElements", 
        //     payload: values
        // })

        figma.ui.postMessage(returnData(values))
    } catch (e) {
        console.error(e);
    }
}

const actionHandler = {
    [actionTypes.getValues]:sendDataAboutThings
}

/**
 * 
 * @param {{
 *  type: string,
 *  payload: any
 * }} msg 
 */
figma.ui.onmessage = msg => {
    console.log("onmessage msg", msg);
    if(msg && msg.type && actionHandler[msg.type]){
        actionHandler[msg.type](msg)
    }
}