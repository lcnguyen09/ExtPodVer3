import ReactDOM from "react-dom/client"
import App from "./App"
import { DEV_MODE } from "./contexts/contants"
import $ from "jquery"

const rootElement = Object.assign(document.createElement('div'), { id: "podorder-ext-app" })
if (DEV_MODE) {
    rootElement.classList.add("dev-mode")
}
document.body.appendChild(rootElement)
$(document).ready(function () {
    // if (
    //     ["localhost"].includes(window.location.hostname)
    // ) {
        ReactDOM.createRoot(rootElement).render(<App />)
    // }
});