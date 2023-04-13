import React from "react";
import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import Recipe from "./Recipe";
import logo from './logo.svg';
import { Buffer } from "buffer";
import {NotificationContainer} from 'react-notifications';
import './App.css';

const App = (props) => {
  const [data, setData] = useState(null);
  const [createFormOpen, setCreateFormOpen] = useState(false);

  const callAPI = async () => {
    const options = {
      method: 'GET',
      mode: 'cors',         
      headers: {
          "Content-Type":"application/json"
      }           
  };
    try{
      const res = await fetch("http://localhost:9000/api/recipes", options);
      const data = await res.json();
      setData(data);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    callAPI();
  },[]);
  const openCreateForm = () => {
    setCreateFormOpen(true);
  }
  return (
    <div className="App">
      <header className="App-header">
        {createFormOpen && (<dialog open><CreateForm setOpen={setCreateFormOpen} callAPI={callAPI}/></dialog>)}
        <button onClick={openCreateForm}>Create New Recipe</button>
        <br/>
        <div style={{display:'flex'}}>
        {data && (
          data.map((d, index) => {
            return(
              <Recipe onClick={()=>{console.log(d._id)}} key={index} Id={d._id}Name={d.Name} Image={d.Image.data} Type={d.Type} Ingredients={d.Ingredients}/>
            )
          })
        )}</div>
      </header>
      <NotificationContainer/>
    </div>
  );
}

export default App;
