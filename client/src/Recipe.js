import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
const Recipe = (props) => {
    const {
        Name,
        Type,
        Id,
        Image,
        Ingredients,
        setEditId,
    } = props;
    const[image, setImage] = useState(null);
    const [mouseOver, setMouseOver] = useState(false);
    const byteArraytoBase64 = (data) => {
        var binary = '';
        var bytes = new Uint8Array( data );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
    }
        var base64 =  window.btoa( binary );
        return base64.split("base64")[1];
      }
    useEffect(() => {
        const b64 = byteArraytoBase64(Image);
        setImage(b64);
    },[Image])
    const onClick = () => {
        setEditId(Id);
    }
    const onMouseEnter = () => {
        setMouseOver(true);
    }
    const onMouseLeave = () => {
        setMouseOver(false);
    }
    return(
        <div data-tooltip-id='edit' data-tooltip-content='Click to Edit' onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{display:'flex', flexDirection: 'column', alignItems:'center', backgroundColor: mouseOver && 'darkgray', cursor: 'pointer'}}>
            <img
              alt="not found"
              width={"100px"}
              src={`data:image/jpg;base64,${image}`}
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
            <Tooltip id="edit"/>
        </div>
    )
}
export default Recipe;