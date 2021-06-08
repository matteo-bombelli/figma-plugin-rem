import React, {Component, Fragment} from "react";
import { ValuesAndData } from "./components/ValuesAndData/index";
import { intro } from "./../i18n/en.json";
import "./MainScreen.less";

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
            <div className="MainScreen">
                {(Array.isArray(values) && values.length) ? (
                    <div
                        className="MainScreen_withData"
                    >
                        <div
                            className="MainScreen_withData_ValuesAndData"
                        >
                            {Array.isArray(values) && values.map((el, index)=>{
                                return (
                                    <ValuesAndData 
                                        {...el} 
                                        key={index} 
                                    />
                                )
                            })}
                        </div>
                        <div
                            className="MainScreen_withData_text"
                        >

                        </div>
                    </div>
                ):(
                    <div
                        className="MainScreen_intro"
                    >
                        {intro}
                    </div>
                )}
            </div>
        )
    }
}