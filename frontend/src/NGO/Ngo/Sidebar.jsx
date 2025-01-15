import React from "react";
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { FaBuildingNgo } from "react-icons/fa6";
import { FaDonate } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import "./Ngo.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation();

  // Hàm kiểm tra nếu đường dẫn hiện tại khớp với link
  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> NGO
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className={`sidebar-list-item ${isActive('/ngo/dashboard') ? 'active' : ''}`}>
          <Link to="/ngo/dashboard" className="sidebar-link">
            <BsGrid1X2Fill className="icon-1" /> Dashboard
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive('/ngo/program-list') ? 'active' : ''}`}>
          <Link to="/ngo/program-list" className="sidebar-link">
            <BsFillArchiveFill className="icon-1" /> Programs
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive('/ngo/ngo-form') ? 'active' : ''}`}>
          <Link to="/ngo/ngo-form/${ngoId}" className="sidebar-link">
            <FaBuildingNgo className="icon-1" /> NGO
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive('/ngo/program-donation') ? 'active' : ''}`}>
          <Link to="/ngo/program-donation" className="sidebar-link">
            <FaDonate className="icon-1" /> ProgramDonation
          </Link>
        </li>
        <li className={`sidebar-list-item ${isActive('/ngo/gallery-image') ? 'active' : ''}`}>
          <Link to="/ngo/gallery-image" className="sidebar-link">
            <BsImages className="icon-1" /> Gallery Image
          </Link>
        </li>
        {/* <li className='sidebar-list-item'>
          <Link to="/admin/user" className="sidebar-link">
            <BsPeopleFill className='icon' /> User
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/order" className="sidebar-link">
            <BsListCheck className='icon' /> Order
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/admin/newsBook" className="sidebar-link">
            <BsListCheck className='icon' /> News Book
          </Link>
        </li> */}
        {/* <li className='sidebar-list-item'>
          <Link to="/admin/createorder" className="sidebar-link"> 
            <BsListCheck className='icon' /> Order Detail
          </Link>
        </li> */}
      </ul>
    </aside>
  );
}

export default Sidebar;
