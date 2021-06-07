import React from "react";
import { keyTocssValue } from "./../../../utils/jsToCss"

export const cssValuesStrings = ({
    keyb,
    pxValue,
    emValue,
    type,
    name,
    version
})=>`
    ${keyTocssValue(keyb)}: ${pxValue} px;
    ${keyTocssValue(keyb)}: ${emValue} rem;
`

export const ValuesAndData = ({
    name, 
    id,
    values
})=>{
    return (
        <div 
            style={{textAlign:"left"}}
        >
            <div>
                <strong>
                    {`id: ${id}`}
                </strong>
            </div>
            <div>
                {`name: ${name}`}
            </div>
            <code>
                <pre>
                    {`${values
                        .map(el=>cssValuesStrings({
                            ...el, 
                            keyb:el.key
                        }))
                        .join("")}`
                    }
                </pre>
            </code>
        </div>
    )
}