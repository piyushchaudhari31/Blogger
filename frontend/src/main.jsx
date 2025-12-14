
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './context/ContextApi.jsx'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
    <ContextApi>
        <BrowserRouter>
            <App />
            <Toaster />
        </BrowserRouter>
    </ContextApi>
)
