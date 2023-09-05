import ReactDOM from "react-dom/client"
import App from "./1_App"
import { DEV_MODE } from "./contexts/contants"
import $ from "jquery"

const rootElement = Object.assign(document.createElement('div'), { id: "podorder-ext-app" })
if (DEV_MODE) {
    rootElement.classList.add("dev-mode")
}
document.body.appendChild(rootElement)
$(document).ready(function () {
    console.log("Extension Ver30 loaded");
    try {
        ReactDOM.createRoot(rootElement).render(<App />)
    } catch (error) {
        console.log('Error: ', error);
    }
});