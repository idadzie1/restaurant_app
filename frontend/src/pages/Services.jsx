import React from 'react'
import mobile1 from '../assets/mobile-iPhone_Air-full (1).png';
import mobile2 from '../assets/mobile-iPhone_17_Pro_Max-full.png';
import mobile3 from '../assets/mobile-iPhone_Air-full.png';
import mobile4 from '../assets/mobile-iPhone_Air-full (2).png'
import mobile5 from '../assets/mobile-iPhone_Air-full (3).png'
import mobile6 from '../assets/mobile-WQXGA_16_10.png'

const Services = () => {
  return (
    <>
    <section className='services'>
       <h2 className='services-heading'>Services Offered By AstroLyncs, Makers Of Restaurants Hub...</h2>      
       <main>
        <div className="card">
            <h3>Website Design & Development</h3>
            <ul>
                <li>Landing page design and development</li>
                <li>Personal portfolio websites</li>
                <li>Business and corporate websites</li>
                <li>Restaurant and food business websites</li>
                <li>E-commerce websites and online store</li>
                <li>Non-profit and NGO websites</li>        
            </ul>
        </div>

        <div className="card">
            <h3>Web Application Development</h3>
            <ul>
                <li>Business directory and listing applications</li>
                <li>Custom web application design and development</li>
                <li>E-commerce web applications</li>
                <li>Admin dashboards and management systems</li>
                <li>Real estate listing and management applications</li>
            </ul>
        </div>        
        </main>
    </section>

    <section className='services-demos'>
        <h3>Demo Section</h3>
        <div className="demos">
            <div className="demo">
                <div className="demo-image">
                    <img src={mobile1} alt="image" />
                </div>
                <h5>Personal portfolio websites</h5>
                <div className="anchor-buttons">
                    <a href="" target='_blank'>GitHub</a>
                    <a href="" target='_blank'>Live Demo</a>
                </div>
            </div>

            <div className="demo">
                <div className="demo-image">
                    <img src={mobile2} alt="image" />
                </div>
                <h5>Business and corporate websites</h5>
                <div className="anchor-buttons">
                    <a href="" target='_blank'>GitHub</a>
                    <a href="" target='_blank'>Live Demo</a>
                </div>
            </div>

            <div className="demo">
                <div className="demo-image">
                    <img src={mobile3} alt="image" />
                </div>
                <h5>Non-profit and NGO websites</h5>
                <div className="anchor-buttons">
                    <a href="" target='_blank'>GitHub</a>
                    <a href="" target='_blank'>Live Demo</a>
                </div>
            </div>

            <div className="demo">
                <div className="demo-image">
                    <img src={mobile4} alt="image" />
                </div>
                <h5>Business and corporate websites</h5>
                <div className="anchor-buttons">
                    <a href="" target='_blank'>GitHub</a>
                    <a href="" target='_blank'>Live Demo</a>
                </div>
            </div>

            <div className="demo">
                <div className="demo-image">
                    <img src={mobile5} alt="image" />
                </div>
                <h5>Personal portfolio websites</h5>
                <div className="anchor-buttons">
                    <a href="" target='_blank'>GitHub</a>
                    <a href="" target='_blank'>Live Demo</a>
                </div>
            </div>

            <div className="demo">
                <div className="demo-image">
                    <img src={mobile6} alt="image" />
                </div>
                <h5>Business directory and listing applications</h5>
                <div className="anchor-buttons">
                    <a href="" target='_blank'>GitHub</a>
                    <a href="" target='_blank'>Live Demo</a>
                </div>
            </div>


        </div>
        </section>    
    </>
   
  )
}

export default Services
