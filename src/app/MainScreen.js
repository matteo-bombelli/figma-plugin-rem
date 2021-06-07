import React, {Component} from "react";
import { ValuesAndData } from "./components/ValuesAndData/index"

export class MainScreen extends React.Component {
    state = {
        values:[]
    }

    componentDidMount = () => {
        const {handleMsg} = this;
        window.onmessage = (msg)=>{
            if(msg && msg.data && msg.data.pluginMessage){
                handleMsg(msg.data.pluginMessage)
            }
        };
    }

    componentWillUnmount = () => {
        window.onmessage = ()=>{}
    }

    handleMsg = msg => {
        try{
            if (msg && msg.type === "return-em-values-for-selectedElements") {
                const { payload } = msg;
                if(payload && Array.isArray(payload)){
                    this.setState({values: payload})
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    requestValuesInEms = () => {
        try{
            postMessage({ pluginMessage: { type: "get-em-values-for-selectedElements" } }, '*')
            parent.postMessage(
                {
                    pluginMessage:{
                        type:"get-em-values-for-selectedElements"
                    }
                }, 
                "*"
            )
        } catch (e) {
            console.error(e);
        }
    }

    render () {
        const { values } = this.state;
        return (
            <div>
                <div>
                    Change the selection to show here the values with em unit
                </div>
                {Array.isArray(values) && values.length && (
                    <div>
                        {Array.isArray(values) && values.map((el, index)=>{
                            return (
                                <ValuesAndData {...el} key={index} />
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}