import ReactDOM from "react-dom/client"
import App from "./1_App"
import { APP_MODE } from "./contexts/contants"
import $ from "jquery"

const rootElement = Object.assign(document.createElement('div'), { id: "podorder-ext-app" })
if (APP_MODE === 'dev') {
    rootElement.classList.add("dev-mode")
}
document.body.appendChild(rootElement)
// $(document).ready(function () {
document.addEventListener("DOMContentLoaded", () => {
    console.log("Extension Ver30 loaded");
    console.log((window as any).tinymce);
    try {
        ReactDOM.createRoot(rootElement).render(<App />)
    } catch (error) {
        console.log('Error: ', error);
    }
});
// });