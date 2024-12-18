import React from 'react';
import './About.css';
// import Header from '../../Components/Header/Header';
import { TbSlash } from "react-icons/tb";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { IoPrint } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import Carousel from './Carousel/Carousel';
import Section from './Section/Section';
import Share from './Share/Share';
import Values from './Values/Values';

const About = () => {
  return (
    <div className='about-mon'>
      {/* <Header /> */}
      <div className='about-share'>
        <div className='about-crumb'>
          <nav className='about-pon'>
            <ol className='about-list'>
              <li className='about-item'>
                <a className='about-cn'>
                  <span className='about-name'>Home</span>
                </a>
                  <span className='about-after'><TbSlash /></span>
              </li>
              <li className='about-da'>
                <span className='about-span'>About Us</span>
              </li>
            </ol>
          </nav>
        </div>
        <div className='about-cmp'>
          <div className='about-inline'>
            <div className='about-st'>
              <RiFacebookFill className='about-sharing' src=''/>
              <span className='about-svg'>Share</span>
            </div>
            <div className='about-data'>
              <RiTwitterXFill className='about-sharing' src=''/>
              <span className='about-svg'>Tweet</span>
            </div>
            <div className='about-label'>
              <IoPrint className='about-sharing' src=''/>
            </div>
            <div className='about-last'>
              <FaPhone className='about-sharing' src=''/>
            </div>
          </div>
        </div>
      </div>

      <div className='about-aem'>
        <div className='about-container'>
          <div className='about-grid'>
            <div className='about-page'>
              <div className='about-class'>
                <h1 className='about-h1'>About Us</h1>
                <p className='about-p'>Charity Navigator helps millions of people take action and support the causes they care about by connecting them to the best charities that align with their passions and values.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Carousel/>
      
      <Section/>
      <Share/>
      <Values/>
    </div>
  );
};

export default About;