import React from 'react';
import './Promotions.css'

const Promotions = () => {
  return (
    <div className='promo-div'>
    <div className='promo-aem'>
      <div className='promo-list'>
        <div className='promo-card'>
          <div className='promo-warp'>
            <div className='promo-header'>
              <div className='promo-title'>Where to Give Now</div>
              <div className='promo-button'>
                <a className='promo-a' href=''>View all</a>
              </div>
            </div>
            <div className='promo-cards'>
              <ul className='promo-active'>
                <li className='promo-Item'>
                  <div className='promo-content'>
                    <a className='promo-discover' href=''></a>
                    <div className='promo-image'>
                      <picture className=''>
                        <img className='promo-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--09a936f5-36f0-4bd5-a968-d5ac14fffdb8/hurricane-milton.jpg.webp?preferwebp=true&width=760'
                        alt='Home boarded up for hurricane milton'></img>
                      </picture>
                    </div>
                    <div className='promo-description'>
                      <div className='promp-ton'>Hurricane Milton</div>
                      <div className='promo-date'>Highly rated charities providing relief and recovery to those impacted by Hurricane Milton.</div>
                    </div>
                  </div>
                </li>
                <li className='promo-Item'>
                  <div className='promo-content'>
                    <a className='promo-discover' href=''></a>
                    <div className='promo-image'>
                      <picture className=''>
                        <img className='promo-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--295ed1fd-7aee-47d6-89a7-1e62565ef424/hurricane-helene-2.jpg.webp?preferwebp=true&width=760'
                        alt='Home boarded up for hurricane milton'></img>
                      </picture>
                    </div>
                    <div className='promo-description'>
                      <div className='promp-ton'>Hurricane Helene</div>
                      <div className='promo-date'>Highly rated charities providing relief and recovery to those impacted by Hurricane Helene.</div>
                    </div>
                  </div>
                </li>
                <li className='promo-Item'>
                  <div className='promo-content'>
                    <a className='promo-discover' href=''></a>
                    <div className='promo-image'>
                      <picture className=''>
                        <img className='promo-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--dd4ee8a5-9a40-43a4-9051-e3c3aa9567cd/Israel-Gaza-Map.jpg.webp?preferwebp=true&width=760'
                        alt='Home boarded up for hurricane milton'></img>
                      </picture>
                    </div>
                    <div className='promo-description'>
                      <div className='promp-ton'>Humanitarian Crisis in Israel and Gaza</div>
                      <div className='promo-date'>Discover and donate to highly rated charities providing disaster relief and recovery services for affected communities in Israel and Gaza.</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='promo-aem'>
      <div className='promo-list'>
        <div className='promo-card'>
          <div className='promo-warp'>
            <div className='promo-header'>
              <div className='promo-title'>Cause-Based Giving</div>
              <div className='promo-button'>
                <a className='promo-a' href=''>View all</a>
              </div>
            </div>
            <div className='promo-cards'>
              <ul className='promo-active'>
                <li className='promo-Item'>
                  <div className='promo-content'>
                    <a className='promo-discover' href=''></a>
                    <div className='promo-image'>
                      <picture className=''>
                        <img className='promo-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--d19fcd1f-2884-407a-9cef-2bfcd801c1b7/shutterstock_2474137865.jpg.webp?preferwebp=true&width=760'
                        alt='Home boarded up for hurricane milton'></img>
                      </picture>
                    </div>
                    <div className='promo-description'>
                      <div className='promp-ton'>Animal Welfare Fund</div>
                      <div className='promo-date'>Our Animal Welfare Fund supports charities making a lasting impact on improving and protecting the lives of animals, especially farmed and wild animals.</div>
                    </div>
                  </div>
                </li>
                <li className='promo-Item'>
                  <div className='promo-content'>
                    <a className='promo-discover' href=''></a>
                    <div className='promo-image'>
                      <picture className=''>
                        <img className='promo-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--97b706a2-b2d3-4d82-97e9-c337dad377e0/homeless_giving.png.webp?preferwebp=true&width=760'
                        alt='Home boarded up for hurricane milton'></img>
                      </picture>
                    </div>
                    <div className='promo-description'>
                      <div className='promp-ton'>End Homelessness Fund</div>
                      <div className='promo-date'>Our End Homelessness Fund supports charities that address the root causes of homelessness and implement proven solutions to increase the availability of affordable housing for those in need.</div>
                    </div>
                  </div>
                </li>
                <li className='promo-Item'>
                  <div className='promo-content'>
                    <a className='promo-discover' href=''></a>
                    <div className='promo-image'>
                      <picture className=''>
                        <img className='promo-anh' src='https://www.charitynavigator.org/adobe/dynamicmedia/deliver/dm-aid--495c229f-a2a5-417e-9924-164d250de28c/shutterstock_2185545177.jpg.webp?preferwebp=true&width=760'
                        alt='Home boarded up for hurricane milton'></img>
                      </picture>
                    </div>
                    <div className='promo-description'>
                      <div className='promp-ton'>End Hunger Fund</div>
                      <div className='promo-date'>Hunger and food insecurity are major challenges in the U.S., affecting millions. Our End Hunger Fund supports organizations effectively addressing food insecurity via food distribution and policy change in the areas with the greatest need.</div>
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

export default Promotions;