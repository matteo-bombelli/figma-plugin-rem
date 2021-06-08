import React from "react";
import { keyTocssValue } from "./../../../utils/jsToCss";
import "./ValuesAndData.less";
import translations from "./../../../i18n/en.json";

export const cssValuesStrings = ({
    keyb,
    pxValue,
    emValue,
    type,
    name,
    version
})=>""+
`    ${keyTocssValue(keyb)}: ${pxValue} px;
    ${keyTocssValue(keyb)}: ${emValue} rem;`

/**
 * 
 * @param {string} id 
 * @param {*} values 
 * @returns 
 */
const cssLike = (id, values) => `
.Element_${id.replace(":", "_")}{
${values
    .map(el=>cssValuesStrings({
        ...el, 
        keyb:el.key
    }))
    .join(`
`)}
}`

export const ValuesAndData = ({
    name, 
    id,
    values
})=>{
    return (
        <div 
            className="ValuesAndData"
            style={{textAlign:"left"}}
        >
            <div 
                className="ValuesAndData_id"
            >
                { `${translations["ValuesAndData.id"]}`
                    .replace("{id}", `${id}`)
                }
            </div>
            <div
                className="ValuesAndData_name"
            >
                {  `${translations["ValuesAndData.name"]}`
                        .replace("{name}", `${name}`)}
            </div>
            <code
                className="ValuesAndData_code"
            >
                <pre>
                    {`${cssLike(id, values)}`}
                </pre>
            </code>
        </div>
    )
}