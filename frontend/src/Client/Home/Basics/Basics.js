import React from 'react';
import './Basics.css'

const Basics = () => {
    return (
    <div>
    <div className='basics-aem'>
      <div className='basics-list'>
        <div className='basics-card'>
          <div className='basics-warp'>
            <div className='basics-header'>
              <div className='basics-title'>Donor Basics</div>
              <div className='basics-button'>
                <a className='basics-a' href=''>See more</a>
              </div>
            </div>
            <div className='basics-cards'>
              <ul className='basics-active'>
                <li className='basics-Item'>
                  <div className='basics-content'>
                    <a className='basics-discover' href=''></a>
                    <div className='basics-image'>
                      <picture className=''>
                        <img className='basics-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--409966a0-e1e0-4bf0-8664-621487dcc748/module_illo_giving101-a-4.svg.webp?preferwebp=true&width=760'
                        alt='Protect Your Giving'></img>
                      </picture>
                    </div>
                    <div className='basics-description'>
                      <div className='promp-ton'>Giving 101</div>
                      <div className='basics-date'>Just starting out with giving? Look here for questions to ask a charity, strategies for maximizing your donation, and more.</div>
                    </div>
                  </div>
                </li>
                <li className='basics-Item'>
                  <div className='basics-content'>
                    <a className='basics-discover' href=''></a>
                    <div className='basics-image'>
                      <picture className=''>
                        <img className='basics-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--3a106627-65ce-4366-93f0-0927e5e899aa/module_illo_giving101-a-3.svg.webp?preferwebp=true&width=760'
                        alt='Where to Give'></img>
                      </picture>
                    </div>
                    <div className='basics-description'>
                      <div className='promp-ton'>Where to Give</div>
                      <div className='basics-date'>Discover and support organizations responding to current events and crises.</div>
                    </div>
                  </div>
                </li>
                <li className='basics-Item'>
                  <div className='basics-content'>
                    <a className='basics-discover' href=''></a>
                    <div className='basics-image'>
                      <picture className=''>
                        <img className='basics-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--be1f4011-46d5-4ca4-9f93-4cde31421d56/module_illo_giving101-a.svg.webp?preferwebp=true&width=760'
                        alt='Donor Tools'></img>
                      </picture>
                    </div>
                    <div className='basics-description'>
                      <div className='promp-ton'>Donor Tools</div>
                      <div className='basics-date'>Whether you’re a new donor or a seasoned philanthropist, use these tools to help make the most of your giving.</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Basics;