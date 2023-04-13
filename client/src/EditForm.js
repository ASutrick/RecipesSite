import { useEffect, useState } from 'react';
const EditForm = (props) => {
    const {id, setId, callAPI} = props;
    const [data, setData] = useState(
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
            setData(data[0]);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(() => {
        getInfo();
    },[])
}
export default EditForm;