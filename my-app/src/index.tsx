import ReactDOM from "react-dom/client"
import App from "./App"

const rootElement = Object.assign(document.createElement('div'), { id: "podorder-ext-app" })
document.body.appendChild(rootElement)
ReactDOM.createRoot(rootElement).render(<App />);