import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
const EditDialog = (props) => {
  const { id, setId, callAPI } = props;
  const [image, setImage] = useState("");
  const [imageIsBase64, setImageIsBase64] = useState(true);
  const [formData, setFormData] = useState({
    Name: "",
    Type: "",
    Ingredients: [
      {
        Name: "",
        Amount: "",
      },
    ],
  });
  const getInfo = async () => {
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await fetch(
        `http://localhost:9000/api/recipes/${id}`,
        options
      );
      const data = await res.json();
      setFormData(data[0]);
      setImage(
        `data:image/png;base64,${byteArraytoBase64(data[0].Image.data)}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  const byteArraytoBase64 = (data) => {
    var binary = "";
    var bytes = new Uint8Array(data);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    var iHateThis = window.btoa(binary);
    return iHateThis.split("base64")[1];
  };
  const filetoBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
  const hasEmptyFields = () => {
    if (formData.Name === "" || formData.Type === "" || image == null) {
      return true;
    }
    var emptyIngredient = false;
    formData.Ingredients.forEach((ing) => {
      if (ing.Name === "" || ing.Amount === "") {
        emptyIngredient = true;
      }
    });
    return emptyIngredient;
  };
  const handleSubmit = async () => {
    if (hasEmptyFields()) {
      NotificationManager.warning("Fill out all Fields");
      return;
    }
    if(imageIsBase64){
    const submitData = {
      Name: formData.Name,
      Type: formData.Type,
      Ingredients: formData.Ingredients,
    };
    const options = {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`http://localhost:9000/api/recipes/${id}`, options);
    if (res.status === 200) {
      NotificationManager.success("Recipe Updated successfully!");
      setImageIsBase64(true);
      setId(null);
      callAPI();
    }
    else{
      NotificationManager.error("Update Unsuccesful!");
    }
  }
  else{
    if(image.type === "image/png") {
      NotificationManager.warning("Cannot store PNG files");
      return;
    }
    var imagetoSend = await filetoBase64(image);
    const submitData = {
      Name: formData.Name,
      Type: formData.Type,
      Image: imagetoSend,
      Ingredients: formData.Ingredients,
    };
    const options = {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`http://localhost:9000/api/recipes/with-image/${id}`, options);
    if (res.status === 200) {
      NotificationManager.success("Recipe Updated successfully!");
      setImageIsBase64(true);
      setId(null);
      callAPI();
    }
  }
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
  const handleRemoveIngredient = () => {
    const data = { ...formData };
    const ingList = [...data.Ingredients];
    ingList.pop();
    data.Ingredients = ingList;
    setFormData(data);
  }
  const handleClose = () => {
    setImageIsBase64(true);
    setId(null);
  };
  const handleDeleteClick = async () => {
    const options = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`http://localhost:9000/api/recipes/${id}`, options);
    if (res.status === 200) {
      NotificationManager.success("Recipe Deleted!");
      setImageIsBase64(true);
      setId(null);
      callAPI();
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div style={{backgroundColor: '#edd7e2', border: "#db1e6f .2rem solid"}}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button class="small-button-style" id="modal" onClick={handleClose}>Back</button>
        <button class="small-button-style" id="modal" onClick={handleDeleteClick}>Delete</button>
        <button class="small-button-style" id="modal" onClick={handleSubmit}>Submit</button>
      </div>
      <div class="sub-text">
        {image ? (
          <div>
            <img alt="not found" width={"100px"} src={imageIsBase64 ? image : URL.createObjectURL(image)} />
            <br />
            <button class="small-button-style" onClick={()=>setImage(null)}>Remove</button>
          </div>
        ) : (
          <label for="inputTag">
            <span class="select-button-style">Select image</span>
            <input
              type="file"
              name="myImage"
              accept=".jpg,.jpeg,.jfif"
              style={{display: 'none'}}
              onChange={(event) => {
                setImageIsBase64(false);
                setImage(event.target.files[0]);
              }}
            />
          </label>
        )}
        <br />
        Name: 
        <input
          class="input-style"
          id="input"
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleNameChange}
        />
        <br />
        Type:
        <input
          class="input-style"
          id="input"
          type="text"
          name="Type"
          value={formData.Type}
          onChange={handleTypeChange}
        />
        <br />
        <br />
        <div class="ingredients-title">Ingredients:</div>
        {formData.Ingredients.map((ing, index) => {
          return (
            <div key={index}>
              Name:
              <input
                class="input-style"
                id="input"
                type="text"
                name="ingrediantName"
                value={formData.Ingredients[index].Name}
                onChange={(e) => handleIngredientNameChange(e, index)}
              />
              <br />
              Amount:
              <input
                class="input-style"
                id="input"
                type="text"
                name="ingrediantAmount"
                value={formData.Ingredients[index].Amount}
                onChange={(e) => handleIngredientAmountChange(e, index)}
              />
              <hr />
            </div>
          );
        })}
        <div style={{justifyContent: 'space-between'}}>
          <button class="reset-button-style" id="modal" onClick={handleAddIngredient}>Add Ingredient</button>
          <button class="reset-button-style" id="modal" onClick={handleRemoveIngredient}>Remove Ingredient</button>
        </div>
      </div>
    </div>
  );
};
export default EditDialog;
