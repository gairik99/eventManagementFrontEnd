import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { ToastContainer } from 'react-toastify'
import { MeetProvider } from './context/meetContext.jsx'
import { MyMeetProvider } from './context/myMeetingContext.jsx'
import { GuestMeetProvider } from './context/guestMeetingContext.jsx'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GuestMeetProvider>
      <MyMeetProvider>
        <MeetProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </MeetProvider>
      </MyMeetProvider>
    </GuestMeetProvider>
    <ToastContainer />
  </StrictMode>,
)
