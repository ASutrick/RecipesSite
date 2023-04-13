import React from "react";
import { useState, useEffect } from "react";
import CreateForm from "./CreateForm";
import Recipe from "./Recipe";
import EditForm from "./EditForm";
import { NotificationContainer } from "react-notifications";
import "./App.css";

const App = (props) => {
  const [data, setData] = useState(null);
  const [recipeSearch, setRecipeSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const callAPI = async () => {
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch("http://localhost:9000/api/recipes", options);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);
  const openCreateForm = () => {
    setCreateFormOpen(true);
  };
  const handleRecipeSearchChange = (e) => {
    //create shallow copy of item
    setRecipeSearch(e.target.value);
  };
  const handleIngredientSearchChange = (e) => {
    //create shallow copy of item
    setIngredientSearch(e.target.value);
  };
  const handleTypeSearchChange = (e) => {
    //create shallow copy of item
    setTypeSearch(e.target.value);
  };
  const handleRecipeSearch = async () => {
    if(recipeSearch === "") return;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(`http://localhost:9000/api/recipes/name/${recipeSearch}`, options);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleIngredientSearch = async () => {
    if(ingredientSearch === "") return;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(`http://localhost:9000/api/recipes/ingredient/${ingredientSearch}`, options);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleTypeSearch = async () => {
    if(typeSearch === "") return;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(`http://localhost:9000/api/recipes/type/${typeSearch}`, options);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleResetClick = async () => {
    const reset = "";
    setRecipeSearch(reset);
    setIngredientSearch(reset);
    setTypeSearch(reset);
    await callAPI();
  }
  return (
    <div className="App">
      <header className="App-header">Dishes & Recipes</header>
      <div className="App-body">
        {createFormOpen && (
          <dialog open>
            <CreateForm setOpen={setCreateFormOpen} callAPI={callAPI} />
          </dialog>
        )}
        {editId && (
          <dialog open>
            <EditForm id={editId} setId={setEditId} callAPI={callAPI} />
          </dialog>
        )}
        <div style={{justifyContent: 'space-between'}}>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <button onClick={openCreateForm}>Create New Recipe</button>
          </div>
          <p style={{display:'flex',justifyContent: 'left'}}>Search:</p>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <input type="text" onChange={handleRecipeSearchChange} value={recipeSearch}></input>
            <button onClick={handleRecipeSearch}>Recipe</button>
          </div>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <input type="text" onChange={handleIngredientSearchChange} value={ingredientSearch}></input>
            <button onClick={handleIngredientSearch}>Ingredient</button>
          </div>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <input type="text" onChange={handleTypeSearchChange} value={typeSearch}></input>
            <button onClick={handleTypeSearch}>Type</button>
          </div>
          <button style={{display:'flex',justifyContent: 'left'}} onClick={handleResetClick}>Reset</button>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          {data &&
            data.map((d, index) => {
              return (
                <Recipe
                  key={index}
                  Id={d._id}
                  setEditId={setEditId}
                  Name={d.Name}
                  Image={d.Image.data}
                  Type={d.Type}
                  Ingredients={d.Ingredients}
                />
              );
            })}
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default App;
