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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

import { useEffect } from 'react';

function getLocalItem()
{
  let list = localStorage.getItem('todolist');

  if(list)
  return JSON.parse(localStorage.getItem('todolist'));
  else
  return [];
}

getLocalItem();

const App = () => {

  const [Input,setInput] = useState("");
  const [TodoList,settodo] = useState(getLocalItem());

 

     const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#100F0F',
  boxShadow: 24,
  p: 4,
};


const showApiData = async ()=>
  {
    const result = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
    console.log(result.data);

  }



  useEffect(()=>
  {
     localStorage.setItem("todolist",JSON.stringify(TodoList));
     showApiData();
  },[TodoList]);


  
  

  function submit(event)
  {
    event.preventDefault();
    if(Input!='')
   settodo([...TodoList ,Input]);
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
          <Typography component="div">{children}</Typography>
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


 const update = (ind)=>
 {
  console.log(ind);
 }







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
                  
                </Tabs>
              
            <TabPanel value={value} index={0} style={{textAlign:"center"}}>
                {
                  TodoList.map((element,index)=>
                  {
                    return (
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} key={index}>
                            <p>{element}</p>
                            <span style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                              <Button varient="contained" color="primary" style={{margin:"10px"}} onClick={()=>
                              {
                                const arr = TodoList;
                                arr.splice(index,1);
                                settodo([...arr]);
                              }}><DeleteForeverIcon/></Button>
            
                             </span>

                          </div>
  )}) 
                }
           </TabPanel>
            </Box>

        </div>  

      </div>
    </div>
  )
}

export default App;