import React from "react";
import { useState, useEffect } from "react";
import CreateDialog from "./CreateDialog";
import Recipe from "./Recipe";
import EditDialog from "./EditDialog";
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
      <header className="App-header">Dishes & Recipes
      <div class="row">
        <div class="column">
          <img class="image" src={require('./images/cookie.webp')} alt="Cookie"></img>
        </div>
        <div class="column">
          <img class="image" src={require('./images/burger.png')} alt="Burger"></img>
        </div>
        <div class="column">
          <img class="image" src={require('./images/cupcake2.png')} alt="Cupcake"></img>
        </div>
        <div class="column">
          <img class="image" src={require('./images/salad2.png')} alt="Salad"></img>
        </div>
        <div class="column">
          <img class="image" src={require('./images/cake.png')} alt="Cake"></img>
        </div>
      </div>
      </header>
      <div className="App-body">
        {createFormOpen && (
          <dialog open>
            <CreateDialog setOpen={setCreateFormOpen} callAPI={callAPI} />
          </dialog>
        )}
        {editId && (
          <dialog open>
            <EditDialog id={editId} setId={setEditId} callAPI={callAPI} />
          </dialog>
        )}
        <div class="sub-text" style={{justifyContent: 'space-between'}}>
          <div style={{display:'flex',justifyContent: 'center'}}>
            <button class="new-button-style" onClick={openCreateForm}>Create New Recipe!</button>
          </div>
          <p style={{display:'flex',justifyContent: 'left'}}>Search for a recipe, an ingredient, or a type:</p>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <input class="input-style" type="text" onChange={handleRecipeSearchChange} value={recipeSearch}></input>
            <button class="small-button-style" id="home" onClick={handleRecipeSearch}>Recipe</button>
          </div>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <input class="input-style" type="text" onChange={handleIngredientSearchChange} value={ingredientSearch}></input>
            <button class="small-button-style" id="home" onClick={handleIngredientSearch}>Ingredient</button>
          </div>
          <div style={{display:'flex',justifyContent: 'left'}}>
            <input class="input-style" type="text" onChange={handleTypeSearchChange} value={typeSearch}></input>
            <button class="small-button-style" id="home" onClick={handleTypeSearch}>Type</button>
          </div>
          <button class="reset-button-style" style={{display:'flex',justifyContent: 'left'}} onClick={handleResetClick}>Reset</button>
        </div>
        <br />
        <div class="desc-text" style={{ display: "flex" }}>
          {data &&
            data.map((d, index) => {
              return (
                <Recipe
                  key= {index}
                  Id= {d._id}
                  setEditId= {setEditId}
                  Name= {d.Name}
                  Image= {d.Image.data}
                  Type= {d.Type}
                  Ingredients= {d.Ingredients}
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
