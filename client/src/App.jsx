import { Route, Routes } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import BookingDetails from "./pages/BookingDetails";
import BookingsPage from "./pages/BookingsPage";
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import PlaceDetails from "./pages/PlaceDetails";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import Profile from './pages/Profile';
import RegisterPage from './pages/RegisterPage';
import UpdatePlaceFromPage from "./pages/UpdatePlaceFormPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/places/:place_id' element={<PlaceDetails />} />

        <Route path='/account' element={<Profile />} />
        <Route path='/account/places' element={<PlacesPage />} />
        <Route path='/account/places/new' element={<PlacesFormPage />} />
        <Route path='/account/edit-places/:place_id' element={<UpdatePlaceFromPage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:booking_id" element={<BookingDetails />} />
      </Route>
    </Routes>

  )
}

export default App
