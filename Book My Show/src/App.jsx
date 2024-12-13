import React from 'react'
import Navbar from "./components/navbar/Navbar";
import Carousel from './components/caresoul/CareSoul';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Newpassword from './components/newpassword/Newpassword';
import ForgotPassword from './components/forgotpassword/Forgotpassword';
import Main from './components/main/Main';
import Footer from './components/maincard/footer/Footer';
import { Routes,Route } from 'react-router-dom';
import MainCard from './components/maincard/MainCard';
// import MainCard from './components/maincard/MainCard';
import Moviedetails from './components/movie details/MovieDetails';
import TicketBooking from './components/ticketbooking/TicketBooking';
import SeatLayout from './components/seatlayout/SeatLayout';
import BookingHistory from './components/bookinghistory/BookingHistory';
import Caresoul from './components/caresoul/CareSoul';

function App() {
  return(<div>
   
 <Navbar/>

 <Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/forgotpassword" element={<ForgotPassword/>}/>
<Route path="/Newpassword" element = {<Newpassword/>}/>
<Route path="/" element = {<div> <Caresoul/><Main/><Footer/></div>}/>
<Route path ="/" element = {<MainCard/>}/>
<Route path="/movies/:id" element={<Moviedetails/>}/>
<Route path="/BookTicket" element={<TicketBooking/>}/>
<Route path="/SeatLayout"  element={<SeatLayout/>}/>
<Route path="/BookingHistory" element={<BookingHistory/>}/>
<Route path="/signup" element={<Signup/>}/>
</Routes>

</div>)
}
export default App;
 
        
      