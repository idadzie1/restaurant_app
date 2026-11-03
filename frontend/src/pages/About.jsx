
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { dirUsageInfo, resOwnerUsage, siteInfo, projectInfo } from '../data/aboutData';

export default function About() {
  const id = React.useId();
  return (
    <div>
      
      <section className='about'>
        <div className="introduction">
          <h1>About</h1>          
          <p className='app-intro'>
            GhanaRestaurantsHub was conceptualized and developed with a vision to help Ghanaian businesses, particularly restaurateurs, food-joint operators and owners of traditional Ghanaian chop bars, expand their visibility and reach customers across Ghana and beyond.
           </p> 
           <p className='app-intro'>
            Our goal is to bring restaurants, food joints and other food establishments together on one centralized online platform, making it easier and more convenient for prospective customers to discover, explore and connect with their preferred dining destinations without spending unnecessary time searching across multiple websites.          
          </p>
          
          <h4>Empowering Restaurant Owners and Food Businesses</h4>
          <p className='app-intro'>
            With restaurateurs and food-business operators at the heart of our platform, GhanaRestaurantsHub provides legitimate business owners and operators with the opportunity to claim ownership of their establishments' existing listings.
           </p>

            <p className='app-intro'>
            Once the necessary verification and validation processes have been successfully completed, approved owners and operators can update their business information, upload photographs, publish menus and manage other relevant details about their establishments.

            This approach gives business owners greater control over how their establishments are presented online while helping prospective customers access more accurate and up-to-date information.                            
          </p>

          <h4>Is Your Restaurant Not Listed?</h4>
          <p className='app-intro'>
             If you cannot find your restaurant, food joint or chop bar on GhanaRestaurantsHub, you can register for free, log in and submit your establishment's details through our restaurant registration process.
            </p> 

            <p className='app-intro'>
            Once submitted, your listing will undergo an administrative review and approval process. Please allow at least two weeks for the review process to be completed.
            </p>
            <p className='app-intro'>
            Upon approval, your establishment can become part of GhanaRestaurantsHub, giving it an additional opportunity to reach prospective customers searching for restaurants and food establishments.
            </p>
            <h4>
                GhanaRestaurantsHub — Connecting People to Ghana's Restaurants and Food Destinations.               
            </h4>
          
      </div>
       
        <div className="accordion-main">
          <div className="accordion-submain">
            <h4 className='how-it-works'>
              How it works
            </h4>
            <p className='how-it-works'>
              Find answers to common questions about using the directory.
            </p>           
            { dirUsageInfo.map(({id, que, ans}) =>(<Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${id}-panel1-content`}
                id={`${id}-panel1-header`}
              >
                <Typography component="span">{que}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {ans}
              </AccordionDetails>
            </Accordion>))}     
          </div> 
  
          
          <div className="accordion-submain"> 
            <h4 className='how-it-works'>
              Restaurant Owners
            </h4>
            <p className='how-it-works'>
              How Restaurant Owners may use app.
            </p>
            {resOwnerUsage.map(({id, que, ans})=>(<Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${id}-panel1-content`}
                id={`${id}-panel1-header`}
              >
                <Typography component="span">{que}</Typography>
              </AccordionSummary>
              <AccordionDetails>
               {ans}
              </AccordionDetails>
            </Accordion>))}

          </div>


          <div className="accordion-submain"> 
            <h4 className='how-it-works'>
              Information on the Site
            </h4>
            <p className='how-it-works'>
              About Information on the Site.
            </p>
            {siteInfo.map(({id, que, ans})=>(<Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${id}-panel1-content`}
                id={`${id}-panel1-header`}
              >
                <Typography component="span">{que}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {ans}
              </AccordionDetails>
            </Accordion>))}
          </div>


          <div className="accordion-submain"> 
            <h4 className='how-it-works'>
              The Project
            </h4>
            <p className='how-it-works'>
              Information about The Project.
            </p>
            {projectInfo.map(({id, que, ans})=>(<Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${id}-panel1-content`}
                id={`${id}-panel1-header`}
              >
                <Typography component="span">{que}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {ans}
              </AccordionDetails>
            </Accordion>))}
          </div>

        </div>      
      </section>
    </div>    
  );
}

