import React from "react";
import { keyTocssValue } from "./../../../utils/jsToCss";
import "./ValuesAndData.less";

export const cssValuesStrings = ({
    keyb,
    pxValue,
    emValue,
    type,
    name,
    version
})=>""+
`    ${keyTocssValue(keyb)}: ${pxValue} px;
    ${keyTocssValue(keyb)}: ${emValue} rem;
`

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
                <strong>
                    {`id: ${id}`}
                </strong>
            </div>
            <div
                className="ValuesAndData_name"
            >
                {`name: ${name}`}
            </div>
            <code
                className="ValuesAndData_code"
            >
                <pre>
                    {`${values
                        .map(el=>cssValuesStrings({
                            ...el, 
                            keyb:el.key
                        }))
                        .join("")}`}
                </pre>
            </code>
        </div>
    )
}