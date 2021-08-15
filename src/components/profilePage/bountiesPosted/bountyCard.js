import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BountySolutionCard from './bountySolutionCard';
import {useStyles} from "../profilePageCss";

export default function BountyCard(props) {
  const classes = useStyles();

  return (
    <div >
      <Accordion className={classes.accordianRoot} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4>{props.questionDetails.questionTitle}</h4>
        </AccordionSummary>
        <AccordionDetails className={classes.accordian} >
          {props.questionDetails.workplanIds &&
            props.questionDetails.workplanIds.length>0  &&
            props.questionDetails.workplanIds.map(workplanId =>
              
              <BountySolutionCard workplanId={workplanId} questionDetails={props.questionDetails} />
        
            )}
            
        </AccordionDetails>
      </Accordion>
      <br></br>
    </div>
  );
}
