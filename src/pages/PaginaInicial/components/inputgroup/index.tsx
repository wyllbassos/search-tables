import React from 'react';

interface InputGroupProps {
    campo: string;
    texto: string;
    fUpdate: (t:any) => void
    fSalva: (t:any) => void
    fLimpa: (t:any) => void
}

const InputGroup: React.FC<InputGroupProps> = ({ campo, texto, fUpdate, fSalva, fLimpa }) => {
    return (
        <li className="nav-item input-group">
            <input
                placeholder={"Filtrar Por "+campo}
                type="text"
                className="form-control"
                aria-label={"Filtrar Por "+campo}
                aria-describedby="button-addon4"
                onChange={(e) => { fUpdate(String(e.target.value))}}
                value={texto}
            >
            </input>
            <div className="input-group-append" id="button-addon4">
                <button
                    className="btn  btn-primary"
                    type="button"
                    onClick={ fSalva }
                >Aplicar
                </button>
                <button
                    className="btn  btn-danger"
                    type="button"
                    onClick={ fLimpa }
                >Limpar
                </button>
            </div>
        </li>        
    );
}

export default InputGroup;