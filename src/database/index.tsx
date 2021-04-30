import React, { useState, useEffect } from 'react';

//var fs = require("fs");

let campos = new Array<string>();

interface tabela{
    nome: string;
    campos: string[];
}

interface dado{
    [key:string]: string
}

//var produtosJSON:{[key:string]:string}[] = JSON.parse(String(fs.readFileSync("./database/produtos.json")));

function DataBase() {
    const [produtosJSON, setProdutosJSON] = useState(new Array<dado>())
    useEffect(()=>{
        (async () => {
            const tabelas:tabela[] = await require("./tabelas.json")
            campos = tabelas[0].campos
            const x:dado[] = await require(`./${tabelas[0].nome}.json`)
            console.log(x)
            setProdutosJSON(x)
        })()
    })
    if(!(produtosJSON.length===0))
    return (
            <table>
                <tbody>
                    <tr>
                        {campos.map((value, index) => {
                            return (
                            <th key={index}> {value} </th>)
                        })}
                    </tr>
                    {produtosJSON.slice(1,10).map((produto, i) => {
                        return (
                        <tr key={i}>
                            {campos.map((value, index) => {
                            return (
                                <td key={index}> {produto[value]} </td>)
                            })}
                        </tr>
                        )
                    })}
                </tbody>
            </table>
    );
    else
        return (
            <div>Carregando</div>
        )
}

export default DataBase;
