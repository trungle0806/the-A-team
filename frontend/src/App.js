import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Client/Home/Home";
import About from "./Client/About/About";
import Contact from "./Client/Contact/Contact";
import Ngos from "./Client/Ngos/Ngos";
import LoginForm from "./Client/Login/LoginForm";
import RegisterForm from "./Client/Register/RegisterForm";
import ForgotAndResetPassword from "./Client/ForgotPassword/ForgotPassword";
import Authentication from "./Admin/Authentication/Authentication";
import AuthContext, { AuthProvider } from "./Context/AuthContext"; // Import AuthProvider
import CustomerData from "./Client/Profile/Profile";
import Favorites from "./Client/Favorites/Favorites";
import ProgramList from "./Client/ProgramList/ProgramList";
import Donate from "./Client/Donate/Donate";
import ThankYouBill from "./Client/Bill/ThankYouBill";
import NgoDetail from "./Client/Ngos/NgoDetail/NgoDetail";
import ProgramListDetail from "./Client/ProgramList/ProgramListDetail/ProgramListDetail";
import NotFound from "./404/NotFound";
import { FavoritesProvider } from "./Context/FavoritesContext"; // Import FavoritesProvider
import DonateDetail1 from "./Client/Donate/DonateDetail";

// Admin routes
import Dashboard from "./Admin/Dashboard/Dashboard";
import CustomerManagement from "./Admin/Customer/CustomerManagement";
import Inviation from "./Admin/Invitation/Invitation";
import ProgramAdminForm from "./Admin/Programadmin/Programadminform";
import ProgramDonation from "./Admin/ProgramDonation/ProgramDonation";
import CensorNgo from "./Admin/CensorNgo/CensorNgo";
import Ngoadmin from "./Admin/Ngoadmin/Ngoadmin";
import Programadmin from "./Admin/Programadmin/Programadmin";
import TransactionHistory from "./Admin/TransactionHistory/TransactionHistory";
import ResetPassword from "./Client/ResetPassword/ResetPassword";
import DonateDetail from "./Admin/Programadmin/DonateDetail";

import Ngo from "./NGO/Ngo/Ngo";
import DashBoard from "./NGO/Ngo/Home";
import ProgramList1 from "./NGO/Program/ProgramList1";
import ProgramDetail from "./NGO/Program/ProgramDetail";
import NGOEditForm from "./NGO/Ngocerter/NgoForm";
import ProgramDonationList from "./NGO/ProgramDonation/ProgramDonationList";
import ProgramDonationDetail from "./NGO/ProgramDonation/ProgramDonationDetail";
import GalleryImageList from "./NGO/GalleryImage/GalleryImageList";

import "./App.css"; // Ensure no duplicate imports

// Wrapper function to ensure AuthProvider and FavoritesProvider are available
function App() {
  const { auth } = useContext(AuthContext); // Access auth state

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ngos" element={<Ngos />} />
          <Route path="/program" element={<ProgramList />} />
          <Route path="/ngos/:id" element={<NgoDetail />} />
          <Route path="/donate/:programId" element={<Donate />} />
          <Route
            path="/ngo/:ngoId/program/:programId/donations"
            element={<DonateDetail1 />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/forgot-password" element={<ForgotAndResetPassword />} />
          <Route path="/profile" element={<CustomerData />} />
          <Route
            path="/program/:programId"
            element={<ProgramListDetail />}
          />{" "}
          <Route path="/404" element={<NotFound />} />
          <Route path="/thank-you-bill" element={<ThankYouBill />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<Authentication />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="ngoadmin" element={<Ngoadmin />} />
            <Route path="inviation" element={<Inviation />} />
            <Route path="censorngo" element={<CensorNgo />} />
            <Route path="program/:programId" element={<ProgramAdminForm />} />
            <Route path="programadmin" element={<Programadmin />} />
            <Route path="programdonation" element={<ProgramDonation />} />
            <Route path="transactionhistory" element={<TransactionHistory />} />
            <Route
              path="ngo/:ngoId/program/:programId/donations"
              element={<DonateDetail />}
            />
          </Route>
          <Route path="/ngo" element={<Ngo />}>
            <Route index element={<DashBoard />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="program-list" element={<ProgramList1 />} />
            <Route path="program/:id" element={<ProgramDetail />} />
            <Route path="ngo-detail" element={<NgoDetail />} />
            <Route path="ngo-form/:id" element={<NGOEditForm />} />
            <Route
              path=":ngoId/program/:programId/donations"
              element={<ProgramDonationDetail />}
            />
            <Route path="program-donation" element={<ProgramDonationList />} />
            <Route path="gallery-image" element={<GalleryImageList />} />
          </Route>
          {/* Reset Password Route */}
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Wrap App with AuthProvider and FavoritesProvider
export default function WrappedApp() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </AuthProvider>
  );
}
