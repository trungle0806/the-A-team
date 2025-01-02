import React from 'react';
import './Dashboard.css';
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowUpSFill } from "react-icons/ri";

const Dashboard = () => {
    return (
        <div className='dashboard-body'>
            <div className='dashboard-gap1'>
                <h6 className='dashboard-fw'>Dashboard</h6>
                <ul className='dashboard-flex'>
                    <li className='dashboard-medium'>
                        <a className='dashboard-hover'>
                            <i className='dashboard-img'></i>
                                Dashboard
                        </a>
                    </li>
                </ul>
            </div>

            <div className='dashboard-gap2 row'>
                <div className='dashboard-col3'>
                    <div className='dashboard-shadow'>
                        <div className='dashboard-p20'>
                            <div className='dashboard-gap'>
                                <div>
                                    <p className='dashboard-fwer'>Total Users</p>
                                    <h6 className='dashboard-h6'>20,000</h6>
                                </div>
                                <div className='dashboard-cyan'>
                                    <i className='dashboard-text-2xl'></i> {/* Add icon */}
                                </div>
                            </div>
                            <p className='dashboard-mt'>
                                <span className='dashboard-d'>
                                    <i className='dashboard-xs'></i>
                                    +5000
                                </span>
                                    Last 30 days users
                            </p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-col3'>
                    <div className='dashboard-shadow'>
                        <div className='dashboard-p20'>
                            <div className='dashboard-gap'>
                                <div>
                                    <p className='dashboard-fwer'>Total Users</p>
                                    <h6 className='dashboard-h6'>20,000</h6>
                                </div>
                                <div className='dashboard-cyan'>
                                    <i className='dashboard-text-2xl'></i> {/* Add icon */}
                                </div>
                            </div>
                            <p className='dashboard-mt'>
                                <span className='dashboard-d'>
                                    <i className='dashboard-xs'></i>
                                    +5000
                                </span>
                                    Last 30 days users
                            </p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-col3'>
                    <div className='dashboard-shadow'>
                        <div className='dashboard-p20'>
                            <div className='dashboard-gap'>
                                <div>
                                    <p className='dashboard-fwer'>Total Users</p>
                                    <h6 className='dashboard-h6'>20,000</h6>
                                </div>
                                <div className='dashboard-cyan'>
                                    <i className='dashboard-text-2xl'></i> {/* Add icon */}
                                </div>
                            </div>
                            <p className='dashboard-mt'>
                                <span className='dashboard-d'>
                                    <i className='dashboard-xs'></i>
                                    +5000
                                </span>
                                    Last 30 days users
                            </p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-col3'>
                    <div className='dashboard-shadow'>
                        <div className='dashboard-p20'>
                            <div className='dashboard-gap'>
                                <div>
                                    <p className='dashboard-fwer'>Total Users</p>
                                    <h6 className='dashboard-h6'>20,000</h6>
                                </div>
                                <div className='dashboard-cyan'>
                                    <i className='dashboard-text-2xl'></i> {/* Add icon */}
                                </div>
                            </div>
                            <p className='dashboard-mt'>
                                <span className='dashboard-d'>
                                    <i className='dashboard-xs'></i>
                                    +5000
                                </span>
                                    Last 30 days users
                            </p>
                        </div>
                    </div>
                </div>
                <div className='dashboard-col3'>
                    <div className='dashboard-shadow'>
                        <div className='dashboard-p20'>
                            <div className='dashboard-gap'>
                                <div>
                                    <p className='dashboard-fwer'>Total Users</p>
                                    <h6 className='dashboard-h6'>20,000</h6>
                                </div>
                                <div className='dashboard-cyan'>
                                    <i className='dashboard-text-2xl'></i> {/* Add icon */}
                                </div>
                            </div>
                            <p className='dashboard-mt'>
                                <span className='dashboard-d'>
                                    <i className='dashboard-xs'></i>
                                    +5000
                                </span>
                                    Last 30 days users
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='dashboard'>
                <div className='dashboard-sale'>
                    <div className='dashboard-gappon'>
                        <div className='dashboard-minout'>
                            <div className='dashboard-betmon'>
                                <h6 className='dashboard-mb-lf'>Sales Statistic</h6>
                                <select className='dashboard-from'></select>
                            </div>
                            <div className='dashboard-aline'>
                                <h6 className='dashboard-nav'>$27,200</h6>
                                <span className='dashboard-one'>
                                    10%
                                    <i className='dashboard-bxs'><RiArrowUpSFill /></i>
                                </span>
                                <span className='dashboard-two'>+ $1500 Per Day</span>
                            </div>
                            <div className='dashboard-chart'></div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-colrt'>
                    <div className='dashboard-border'>
                        <div className='dashboard-bodyone'>
                            <h6 className='dashboard-textum'>Total Subscriber</h6>
                            <div className='dashboard-dflex'>
                                <h6 className='dashboard-semi'>5,000</h6>
                                <p className='dashboard-mbo'>
                                    <span className='dashboard-focus'>
                                        10%
                                        <i className='dashboard-bxs1'><IoMdArrowDropdown /></i>
                                    </span>
                                        - 20 Per Day
                                </p>
                            </div>
                            <div className='dashboard-chartbar'></div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-conmon'>
                    <div className='dashboard-over'>
                        <div className='dashboard-pbogu'>
                            <div className='dashboard-gapum'>
                                <h6 className='dashboard-bold'>Users Overview</h6>
                                <div className='dashboard-gap'>
                                    <select className='dashboard-pen'></select>
                                </div>
                            </div>
                            <div className='dashboard-user'></div>
                            <ul className='dashboard-justify'>
                                <li className='dashboard-flec'>
                                    <span className='dashboard-gin'></span>
                                    <span className='dashboard-normal'>
                                        New:
                                        <span className='dashboard-fw-sem'>500</span>
                                    </span>
                                </li>
                                <li className='dashboard-fler'>
                                    <span className='dashboard-yellow'></span>
                                    <span className='dashboard-normal'>
                                        Subscribed:
                                        <span className='dashboard-fw-sem'>300</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='dashboard-clo-9'>
                    <div className='dashboard-h100'>
                        <div className='dasboard-p24'>
                            <div className='dashboard-mb16'>
                                <ul className='dashboard-mb0'>
                                    <li className='dashboard-nav'></li>
                                    <li className='dashboard-nav'></li>
                                </ul>
                                <a className='dashboard-gap1'>
                                    View All
                                <i className='dashboard-solar'><MdKeyboardArrowRight /></i>
                                </a>
                            </div>
                            <div className='dashboard-content3'>
                                <div className='dashboard-tabpanel'>
                                    <div className='dashboard-bor'>
                                    <table className='dashboard-table'>
                                        <thead>
                                            <tr>
                                                <th className='dashboard-scope'>Users</th>
                                                <th className='dashboard-scope1'>Register</th>
                                                <th className='dashboard-scope1'>Plan</th>
                                                <th className='dashboard-scope'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className='dashboard-tbody'>
                                            <tr>
                                                <td>
                                                    <div className='dashboard-items1'>
                                                        <img className='dashboard-px' src='https://laravel.wowdash.wowtheme7.com/assets/images/users/user1.png'></img>
                                                        <div className='dashboard-grow1'>
                                                            <h6 className='dashboard-textmb'></h6> {/* Add text Name loading từ Api */}
                                                            <span className='dashboard-sm'></span> {/* Add text EmailEmail loading từ Api */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td></td> {/* Add text ngày loading từ Api */}
                                                <td></td> {/* Add text */}
                                                <td className='dashboard-text'>
                                                    <span className='dashboard-bg'>Active</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-clo-12'>
                        <div className='dashboard-h100'>
                            <div className='dashboard-bodygon'>
                                <div className='dashboard-jus'>
                                    <h6 className='dashboard-top'>Top Donate</h6>
                                    <a className='dashboard-hoverone'>
                                        View All
                                        <i className='dashboard-solar'><MdKeyboardArrowRight /></i>
                                    </a>
                                </div>
                                <div className='dashboardmt32'>
                                    <div className='dashboard-between'>
                                        <div className='dashboard-mon'>
                                            <img className='dashboard-w40px' src='https://laravel.wowdash.wowtheme7.com/assets/images/users/user1.png'></img>
                                            <div className='dashboard-growmun'>
                                                <h6 className='dashboard-textmun'></h6> {/* Add text Name loading từ Api */}
                                                <span className='dashboard-sm'></span> {/* Add text Id loading từ Api */}
                                            </div>
                                        </div>
                                        <div className='dashboard-primary'>$20</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;