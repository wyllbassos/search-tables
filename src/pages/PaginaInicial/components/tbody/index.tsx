import React from 'react';
import Item from '../item';

interface TbodyProps{
    listaCampos:string[];
    itens:any[];
}

const Tbody: React.FC<TbodyProps> = ({itens, listaCampos}) => {
    return (
        <tbody key={listaCampos[0]}>
            {itens.map((item:any, i) => {
                return ( <Item key={"Item"+i} item={item} listaCampos={listaCampos}/> )
            })}
      </tbody>
    );
}

export default Tbody;