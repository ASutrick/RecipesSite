import { useState, useEffect } from 'react';
const Recipe = (props) => {
    const {
        Name,
        Type,
        Id,
        Image,
        onClick,
        Ingredients,
    } = props;
    const[image, setImage] = useState(null);
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
    useEffect(() => {
        const b64 = toBase64(Image);
        setImage(b64);
    },[])
    return(
        <div onClick={onClick} style={{display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <img
              alt="not found"
              width={"100px"}
              src={`data:image/png;base64,${image}`}
            />
            <div style={{width:'100%'}}>Recipe:{Name}</div>
            <div style={{width:'100%'}}>Type:{Type}</div>
            <div style={{width:'100%'}}>{Ingredients.map((ing,index) => {
                return(
                    <div key={index}>
                        <div>Ingredient:{ing.Name}</div>
                        <div>Amount:{ing.Amount}</div>
                    </div>
                )
            })}</div>
            
        </div>
    )
}
export default Recipe;