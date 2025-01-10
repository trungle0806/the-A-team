import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoMdImages } from "react-icons/io";
import { FaBuildingNgo } from "react-icons/fa6";
import "./Ngo.css";
import { FaDonate } from "react-icons/fa";
import { BsImages } from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/ngo/dashboard" className="sidebar-link">
            <BsGrid1X2Fill className="icon-1" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/ngo/program-list" className="sidebar-link">
            <BsFillArchiveFill className="icon-1" /> Programs
          </Link>
        </li>
         <li className='sidebar-list-item'>
          <Link to="/ngo/ngo-form" className="sidebar-link">
            <FaBuildingNgo className='icon-1' /> NGO
          </Link>
        </li>
        
        <li className='sidebar-list-item'>
          <Link to="/ngo/program-donation" className="sidebar-link">
            <FaDonate  className='icon-1' /> ProgramDonation
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/ngo/gallery-image" className="sidebar-link">
            <BsImages className='icon-1' /> Gallery Image
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
