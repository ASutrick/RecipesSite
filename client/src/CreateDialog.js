import { useState } from "react";
import {NotificationManager} from 'react-notifications';
const CreateDialog = (props) => {
  const { setOpen, callAPI } = props;
  const initialValues = {
    Name: "",
    Type: "",
    Ingredients: [
      {
        Name: "",
        Amount: "",
      },
    ],
  };
  const [formData, setFormData] = useState(initialValues);
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    //create shallow copy of item
    const data = { ...formData };
    //update item
    data.Name = e.target.value;
    //set new state
    setFormData(data);
  };
  const handleTypeChange = (e) => {
    //create shallow copy of item
    const data = { ...formData };
    //update item
    data.Type = e.target.value;
    //set new state
    setFormData(data);
  };
  const handleIngredientNameChange = (e, index) => {
    //create shallow copy of item
    const data = { ...formData };
    const ingList = [...data.Ingredients];
    const ing = { ...ingList[index] };
    //update item
    ing.Name = e.target.value;
    ingList[index] = ing;
    data.Ingredients = ingList;
    //set new state
    setFormData(data);
  };
  const handleIngredientAmountChange = (e, index) => {
    //create shallow copy of item
    const data = { ...formData };
    const ingList = [...data.Ingredients];
    const ing = { ...ingList[index] };
    //update item
    ing.Amount = e.target.value;
    ingList[index] = ing;
    data.Ingredients = ingList;
    //set new state
    setFormData(data);
  };
  const handleAddIngredient = () => {
    console.log("here");
    const data = { ...formData };
    const ingList = [...data.Ingredients];
    const newList = ingList.concat({ Name: "", Amount: "" });
    data.Ingredients = newList;
    setFormData(data);
  };
  const handleClose = () => {
    setOpen(false);
  }
  const hasEmptyFields = () => {
    if(formData.Name === "" || formData.Type === "" || image == null) 
    {
        return true;
    }
    var emptyIngredient = false;
    formData.Ingredients.forEach(ing => {
        if(ing.Name === "" || ing.Amount === "")
        {
            emptyIngredient = true;
        }
    })
    return emptyIngredient;
  }

  const handleSubmit = async () => {
    const b64 = await toBase64(image);
    if(image.type === "image/png") {
      NotificationManager.warning("Cannot store PNG files");
      return;
    }
    if(hasEmptyFields()) 
    {
        NotificationManager.warning("Please Fill out all Fields");
        return;
    }
    const submitData = {
        Name: formData.Name,
        Type: formData.Type,
        Image: b64,
        Ingredients: formData.Ingredients
    }
    const options = {
        method: 'POST',
        mode: 'cors',         
        body: JSON.stringify(submitData),
        headers: {
            "Content-Type":"application/json"
        }           
    };
    const res = await fetch("http://localhost:9000/api/recipes", options);
    if(res.status === 200)
    {
      NotificationManager.success("Recipe added successfully!");
      callAPI();
      setOpen(false);
    }
    else{
      NotificationManager.error("Could not add Recipe!")
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
  return (
    <div>
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <button onClick={handleClose}>Back</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
      <div>
        {image ? (
          <div>
            <img
              alt="not found"
              width={"100px"}
              src={URL.createObjectURL(image)}
            />
            <br />
            <button onClick={() => setImage(null)}>Remove</button>
          </div>
        ) : (
          <input
            type="file"
            accept=".jpg,.jpeg,.jfif"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setImage(event.target.files[0]);
            }}
          />
        )}
        <br />
        Name:
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleNameChange}
        />
        <br />
        Type:
        <input
          type="text"
          name="Type"
          value={formData.Type}
          onChange={handleTypeChange}
        />
        <br />
        <br />
        Ingredients:
        {formData.Ingredients.map((ing, index) => {
          return (
            <div key={index}>
              Name:
              <input
                type="text"
                name="ingrediantName"
                value={formData.Ingredients[index].Name}
                onChange={(e) => handleIngredientNameChange(e, index)}
              />
              <br />
              Amount:
              <input
                type="text"
                name="ingrediantAmount"
                value={formData.Ingredients[index].Amount}
                onChange={(e) => handleIngredientAmountChange(e, index)}
              />
              <hr />
            </div>
          );
        })}
        <button onClick={handleAddIngredient}>New Ingredient</button>
      </div>
    </div>
  );
};
export default CreateDialog;
