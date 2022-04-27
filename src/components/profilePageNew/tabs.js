import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BountyPosted from "./bountyPosted/bountiesPosted";
import BountySolved from './bountySolved/bountySolved';
import VotedSolution from './votedSolution/votedSolution';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProfileTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          style={{marginLeft:"2%"}}
          aria-label="basic tabs example"
        >
          <Tab
            className="profile-tab-heading"
            label="Bounties Posted"
            {...a11yProps(0)}
          />
          <Tab
            className="profile-tab-heading"
            label="Bounties Solved"
            {...a11yProps(1)}
          />
          {/* <Tab
            className="profile-tab-heading"
            style={{ marginLeft: "-3%" }}
            label="Voting"
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </Box>
      <hr
        className="question-hr"
        style={{ marginTop: "1vh", marginLeft: "0.6vw" , width:"100%"}}
      />
      <TabPanel value={value} index={0}>
        <BountyPosted />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BountySolved />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VotedSolution />
      </TabPanel>
    </Box>
  );
}
