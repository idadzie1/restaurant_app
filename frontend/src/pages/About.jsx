
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
            The Dine Finder web app directory was conceptualized and concieved to help Ghanaian businesses, with particular focus on restaurateurs, operators of food joints and what is locally referrred to as "chop bars" extend their reach within Ghana and beyond. 
            The aim is to aggregate or concentrate these establishments in one place on the web to save time and energy of prospective clients seaching on the internet for a favorite restaurant or food joint.           
          </p>

          <p className='app-intro'>
            Having designed the web app with restaurateurs and operators of food joints in mind, it allows them to claim ownership of any preloaded basic information about any restraurants and update them once varifiaction and validation processes have been met. Restaurateurs and operators of food joints can also upload and post informtion about their busineses, including photos.                 
          </p>
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

