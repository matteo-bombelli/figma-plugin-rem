import './ui.css'
import "./app";

/*
window.onload = ()=>{
    try{
        document.getElementById('create').onclick = () => {
            const textbox = document.getElementById('count') as HTMLInputElement
            const count = parseInt(textbox.value, 10)
            parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
        }
        
        document.getElementById('cancel').onclick = () => {
            parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
        }
    } catch (e) {
        console.error(e);
    }
}
*/