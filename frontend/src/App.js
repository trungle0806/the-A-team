import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Client/Home/Home";
import About from "./Client/About/About";
import Contact from "./Client/Contact/Contact";
import News from "./Client/News/News";
import LoginForm from "./Client/Login/LoginForm";
import RegisterForm from "./Client/Register/RegisterForm";
import CartForm from "./Client/Cart/CartForm";
import ForgotAndResetPassword from "./Client/ForgotPassword/ForgotPassword";
import Authentication from "./Admin/Authentication/Authentication";
import AuthContext, { AuthProvider } from "./Context/AuthContext"; // Import AuthProvider
import Profile from "./Client/Profile/Profile";
// import Productclient from "./Client/Productclient/Productclient";

// Admin routes
import CustomerManagement from "./Admin/Customer/CustomerManagement";
import GalleryImage from "./Admin/GalleryImage/Image";
import Inviation from "./Admin/Invitation/Invitation";
import Ngo from "../src/Admin/NGOs/Ngos";
import Partner from "../src/Admin/Partner/Partner";
import Program1 from "../src/Admin/Program1/Program1";
import ProgramDonation from "../src/Admin/ProgramDonation/Prodonation";
import Query from "../src/Admin/Query/Query";
import TransactionHistory from "../src/Admin/TransactionHistory/TransactionHistory";
import ForgotPassword from "./Client/ForgotPassword/ForgotPassword";
import ResetPassword from "./Client/ResetPassword/ResetPassword";
import "./App.css"; // Avoid duplicate import

function App() {
  const { auth } = useContext(AuthContext); // Access auth state

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/productclient" element={<Productclient/>} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/cart" element={<CartForm />} />
          <Route path="/forgot-password" element={<ForgotAndResetPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          {/* <Route path="/admin" element={<Admin />}></Route> */}

          <Route path="/admin" element={<Authentication />}>
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="galleryimage" element={<GalleryImage />} />
            <Route path="inviation" element={<Inviation />} />
            <Route path="ngo" element={<Ngo />} />
            <Route path="partner" element={<Partner />} />
            <Route path="program1" element={<Program1 />} />
            <Route path="programDonation" element={<ProgramDonation />} />
            <Route path="query" element={<Query />} />
            <Route path="transactionhistory" element={<TransactionHistory />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/enter-code" element={<EnterCode />} /> */}
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
