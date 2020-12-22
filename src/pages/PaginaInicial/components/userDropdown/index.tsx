import React from 'react';
import { NavDropdown, NavDropdownProps } from 'react-bootstrap';

interface UserDropDownProps extends NavDropdownProps{
    id: string;
    title: string;
    fOnSelect: (t:any) => void
    itens: any[];
    itemAtivo: any;
}

const UserDropDown: React.FC<UserDropDownProps> = ({ id, title, fOnSelect, itens, itemAtivo }) => {
    return (
        <NavDropdown onSelect={fOnSelect} title={title} id={id}>
            {itens.map((element: any, i:number) => (
                <NavDropdown.Item key={i} eventKey={String(element)} className={(element === itemAtivo ? "active" : "")}>{element}</NavDropdown.Item>
            ))}
        </NavDropdown>
    );
}

export default UserDropDown;