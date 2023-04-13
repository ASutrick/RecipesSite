import { useEffect, useState } from 'react';
const EditForm = (props) => {
    const {id, setId, callAPI} = props;
    const [image,setImage] = useState(null);
    const [formData, setFormData] = useState(
    { 
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
            method: 'GET',
            mode: 'cors',         
            headers: {
                "Content-Type":"application/json"
            }           
        };
        try{
            const res = await fetch(`http://localhost:9000/api/recipes/${id}`, options);
            const data = await res.json();
            console.log(data[0]);
            setFormData(data[0]);
            setImage(toBase64(data[0].Image.data));
        }
        catch(err){
            console.log(err);
        }
    }
    const toBase64 = (data) => {
        var binary = '';
        var bytes = new Uint8Array( data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
    }
        var iHateThis =  window.btoa( binary );
        return iHateThis.split("base64")[1];
      }
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
      const handleSubmit = () => {
        console.log(formData);
      }
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
        setId(null);
      }
    
    useEffect(() => {
        getInfo();
    },[])

    return(
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
              src={`data:image/png;base64,${image}`}
            />
            <br />
            <button onClick={() => setImage(null)}>Remove</button>
          </div>
        ) : (
          <input
            type="file"
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
    )
}
export default EditForm;