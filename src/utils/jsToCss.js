export const jsToCss = {
    "fontSize":"font-size",
    "lineHeight": "line-height",
    "cornerRadius": "border-radius",
    "bottomLeftRadius": "border-bottom-left-radius",
    "bottomRightRadius": "border-bottom-right-radius",
    "topRightRadius": "border-top-right-radius",
    "topLeftRadius": "border-top-left-radius",
    "strokeWeight":"border-width"
}

/**
 * 
 * @param {string} key 
 * @returns {string}
 */
export const keyTocssValue = (key)=>{
    if(jsToCss[key]){
        return jsToCss[key];
    }
    return key;
}