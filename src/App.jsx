import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './app.css';
import Mytodo from './components/Mytodo';
import db from "./firebase";
import firebase from 'firebase';
import { useEffect } from 'react';
const App = () => {

  const [Input,setInput] = useState("");
  const [TodoList,setTodo] = useState([]);
  const [pending,setPending] = useState([]);
  // const [completed,setCompleted] = useState([]);
  // const [completed,setCompleted] = useState([]);


  useEffect(()=>
{
  // this loads fire when the app loads 
  db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
    setTodo(snapshot.docs.map(doc => ({id :doc.id , task: doc.data().task,completed:doc.data().completed})));
    setPending(snapshot.docs.map(doc => ({id :doc.id , task: doc.data().task,completed:doc.data().completed})));
  });

  

},[])


  

  function submit(event)
  {
    event.preventDefault();
   db.collection('todos').add({
      task: Input,
      completed:false,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    });
   setInput("");
  }

  function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };










  return (
    <div className='App'>
      <div className="main--container">
        
        {/* Input Section code */}
        <form className='input_section' onSubmit={submit}> 
          <TextField fullWidth id="outlined-basic" label="Enter todo here...." variant="outlined" value={Input}  onChange={(event)=> setInput(event.target.value)}/>
         <Button variant="outlined" type="submit" style={{margin:"10px",}}> <AddCircleIcon color="prmiary"  fontSize="large"/>  </Button>
        </form>

        <div className="todo-section">

              <Box sx={{ bgcolor: '#1A2027', color:"white", width:"100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="All Task" {...a11yProps(0)}  sx={{ bgcolor:"#272727",}} />
                  <Tab label="Pending Task" {...a11yProps(1)}  sx={{ bgcolor:"#272727",}}/>
                  <Tab label="Completed Task" {...a11yProps(2)} sx={{ bgcolor:"#272727",}}/>
                </Tabs>
              
                <TabPanel value={value} index={0} >
                {TodoList.map((element,index)=>
                {
                  return <Mytodo text={element} key={index} type={true}></Mytodo>
                })}
                </TabPanel>
                <TabPanel value={value} index={1} >
                  This is pending
                  {TodoList.map((element,index)=>
                {
                  if(element.completed==false)
                  return <Mytodo text={element} key={index} type={false}></Mytodo>
                })}
                </TabPanel>
                <TabPanel value={value} index={2} >
                  {TodoList.map((element,index)=>
                {
                  if(element.completed)
                  return <Mytodo text={element} key={index} type={true}></Mytodo>
                })}
                </TabPanel>
            </Box>

        </div>  

      </div>
    </div>
  )
}

export default App;