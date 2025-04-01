import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import UserNameUpdatePage from './pages/UserNameUpdatePage'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import Availability from './pages/Availability'
import Settings from './pages/Settings'
import AddMeeting1 from './pages/AddMeeting1'
import AddMeeting2 from './pages/AddMeeting2'
import CopyMeeting from './pages/CopyMeeting'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/usernameupdate' element={<ProtectedRoute><UserNameUpdatePage /></ProtectedRoute>} />
        <Route path='/events' element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        <Route path='/availability' element={<ProtectedRoute> <Availability /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path='/addmeeting1' element={<ProtectedRoute><AddMeeting1 /></ProtectedRoute>} />
        <Route path='/addmeeting1/:id' element={<ProtectedRoute><AddMeeting1 /></ProtectedRoute>} />
        <Route path='/addmeeting2' element={<ProtectedRoute><AddMeeting2 /></ProtectedRoute>} />
        <Route path='/addmeeting2/:id' element={<ProtectedRoute><AddMeeting2 /></ProtectedRoute>} />
        <Route path='/copymeeting/:id' element={<CopyMeeting />} />
      </Routes>
    </>
  )
}

export default App
