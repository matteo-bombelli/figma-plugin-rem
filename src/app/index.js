import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {MainScreen} from "./MainScreen";

window.onload = ()=>{
    ReactDOM.render(
        <MainScreen />, 
        document.getElementById('root')
    )
}