import React from 'react';

interface ItemProps{
    listaCampos:string[];
    item:any;
}

const Item: React.FC<ItemProps> = ({listaCampos, item}) => {
    return (
        <tr> 
            {
            listaCampos.map((campo:string, index:number) => {
                return (() => {
                    try {
                        return(<td key={index.toString()}> {item[campo]} </td>)
                    } catch (error) {
                        alert(error)
                    }
                })()
            })}
        </tr>
    );
}

export default Item;