import React from 'react';

const Thead: React.FC<{listaCampos:string[]}> = ({listaCampos}) => {
    return (
        <thead>
            <tr>
                {listaCampos.map((campo, index) => {
                    return (
                    <th key={index}> {campo} </th>)
                })}
            </tr>
        </thead>
    );
}

export default Thead;