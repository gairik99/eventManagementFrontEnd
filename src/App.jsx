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

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/usernameupdate' element={<UserNameUpdatePage />} />
        <Route path='/events' element={<Events />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='/availability' element={<Availability />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/addmeeting1' element={<AddMeeting1 />} />
        <Route path='/addmeeting1/:id' element={<AddMeeting1 />} />
        <Route path='/addmeeting2' element={<AddMeeting2 />} />
        <Route path='/addmeeting2/:id' element={<AddMeeting2 />} />
        <Route path='/copymeeting/:id' element={<CopyMeeting />} />
      </Routes>
    </>
  )
}

export default App
