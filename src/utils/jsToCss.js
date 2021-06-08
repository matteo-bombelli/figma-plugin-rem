import { jsToCss } from "./../conf/basicValues"

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