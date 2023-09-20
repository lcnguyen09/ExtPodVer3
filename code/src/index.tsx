import ReactDOM from "react-dom/client"
import App from "./1_App"
import { APP_MODE } from "./contexts/contants"

const rootElement = Object.assign(document.createElement('div'), { id: "podorder-ext-app" })
if (APP_MODE === 'dev' || process.env.REACT_APP_APP_MODE === 'dev') {
    rootElement.classList.add("dev-mode")
}
document.body.appendChild(rootElement)
document.addEventListener("DOMContentLoaded", () => {
    console.log("Extension Ver30 loaded");
    try {
        ReactDOM.createRoot(rootElement).render(<App />)
    } catch (error) {
        console.log('Error: ', error);
    }
});