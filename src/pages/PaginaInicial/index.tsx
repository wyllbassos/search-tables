import React, { useState, useEffect } from 'react';
//import InputGroup from './components/inputgroup';
import Tbody from './components/tbody';
import Thead from './components/thead';
import "./styles.css"
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Tabs, Tab, NavbarBrand, NavItem, InputGroup } from 'react-bootstrap';
import UserDropDown from './components/userDropdown/index';

interface tabela {
  NOME: string;
  CAMPOS: string[];
}

interface CampoProps {
  nome: string;
  ativo: boolean;
}

interface ItemProps {
  [key: string]: string | boolean;
  __ativo: boolean;
}

export class ClassInfoTabela {//} implements infoTabelaProps {
  numRegistrosFiltrados = 0;
  limite = 10;
  nome = "";
  itens = new Array<ItemProps>();
  campos = new Array<CampoProps>();
  listaCampos = new Array<string>();
  ativo = true;
  listaFiltros = new Array<ClassFiltroProps>(new ClassFiltroProps())
  constructor(nome: string) {
    this.nome = nome;
  }
}

interface ObjClassInfoTabela {
  [key: string]: ClassInfoTabela
}

class ClassFiltroProps {//} implements filtroProps {
  campo = "";
  condicao = "CONTEM";
  operacao = "";
  texto = "";
}

class ClassObjetoGlobal {
  //--------------------------------
  //    V A R I A V E I S
  //--------------------------------
  private listaTabela: string[] = [];
  private tabelaAtiva = "";
  private infoTabelas: ObjClassInfoTabela = {}// = new Array<listaTabelasProps>();

  private aplicaFiltro() {
    console.log(this.getTabelaAtiva.listaFiltros)
    this.getTabelaAtiva.numRegistrosFiltrados = 0;
    this.getTabelaAtiva.itens.map((element) => { element.__ativo = true; return element })
    try {
      this.getTabelaAtiva.itens.map((element) => {
        let bRet = true;
        this.getTabelaAtiva.listaFiltros.forEach(filtro => {
          let { campo, texto, condicao } = filtro;
          texto = String(texto.toUpperCase());
          if (texto !== "") {
            let valueCampo = ""
            if(campo==="QUALQUER" && (condicao === "CONTEM"||condicao === "CONTEM EXATO"))
              this.getTabelaAtiva.listaCampos.forEach(lCampo => {
                valueCampo += String(element[lCampo])+"\t"
              }) 
            else
              valueCampo = String(element[campo])
            switch (condicao) {
              case ("CONTEM"):
                const arrTexto: string[] = texto.split(" ");
                bRet = bRet && true;
                for (let index = 0; index < arrTexto.length; index++) {
                  const locTexto = arrTexto[index];
                  if (!bRet)
                    continue;
                  if (locTexto !== "")
                    bRet = bRet && valueCampo.indexOf(locTexto) > -1
                }
                break;
              case ("CONTEM EXATO"):
                bRet = bRet && valueCampo.indexOf(texto) > -1
                break;
              case ("IGUAL"):
                if(!(campo==="QUALQUER"))  
                  bRet = bRet && element[campo] === texto
                else {
                  let lbRet = false;
                  this.getTabelaAtiva.listaCampos.forEach(lCampo => {
                    lbRet = lbRet || element[lCampo] === texto
                  })
                  bRet = bRet && lbRet;
                }
                break;
              case ("COMECA"):
                bRet = bRet && (valueCampo.slice(0, texto.length)) === texto
                break;
              default:
                break;
            }
          }
        })
        element.__ativo = element.__ativo && bRet;
        if (bRet)
          this.getTabelaAtiva.numRegistrosFiltrados++;
        //this.setDadosSplit();
        return element;
      })
    } catch (error) {
      console.log(error, this.getTabelaAtiva.listaFiltros)
    }
  }
  //--------------------------------
  //    D A D O S   F I L T R O S
  //--------------------------------
  //--------------------------------
  //S E T S   -   F I L T R O S
  //--------------------------------
  public setFiltroLimite(limite: number) {
    this.getTabelaAtiva.limite = limite;
  }
  public setFiltroCampo(campo: string) {
    this.getTabelaAtiva.listaFiltros[0].campo = campo;
    this.aplicaFiltro()
  }
  public setFiltroCondicao(condicao: string) {
    this.getTabelaAtiva.listaFiltros[0].condicao = condicao;
    this.aplicaFiltro()
  }
  public setFiltroTexto(texto: string) {
    this.getTabelaAtiva.listaFiltros[0].texto = texto;
    this.aplicaFiltro()
  }
  public setFiltroOperacao(operacao: string) {
    this.getTabelaAtiva.listaFiltros[0].operacao = operacao;
    this.aplicaFiltro()
  }
  //--------------------------------
  //    D A D O S   T A B E L A S
  //--------------------------------
  //--------------------------------
  //A D D S   -   T A B E L A S
  //--------------------------------
  public addTabela(tabela: string) {
    this.infoTabelas[tabela] = new ClassInfoTabela(tabela);
    this.listaTabela.push(tabela);
    //this.numTabelas++;
  }
  public addCampo(tabela: string, campo: string) {
    this.infoTabelas[tabela].campos.push({ nome: campo, ativo: true })
    this.infoTabelas[tabela].listaCampos.push(campo)
  }
  public addOptionTabela(tabela: string) {
    this.listaTabela.push(tabela);
  }
  //--------------------------------
  //S E T S   -   T A B E L A S
  //--------------------------------
  public setDadosTabela(itens: ItemProps[]) {
    this.getTabelaAtiva.itens = itens;
    this.getTabelaAtiva.numRegistrosFiltrados = 0;
    itens.map((item, i) => {
      this.getTabelaAtiva.numRegistrosFiltrados++;
      item.__ativo = true;
      return item;
    })
  }

  public setTabelaAtiva(tabela: string) {
    if (this.infoTabelas[tabela])
      this.tabelaAtiva = tabela;
  }
  //--------------------------------
  //G E T S   -   T A B E L A S
  //--------------------------------
  public get getTabelaAtiva(): ClassInfoTabela {
    return this.infoTabelas[this.tabelaAtiva]
  }
  public get getNomeTabelas(): string[] {
    return this.listaTabela;
  }
}

//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
function initInfoTabelas(): ClassObjetoGlobal {
  const newInfoTabelas = new ClassObjetoGlobal();
  let ltabs: tabela[] = require("../../database/tabelas.json")
  const txtLtabs = JSON.stringify(ltabs).toUpperCase()
  ltabs = JSON.parse(txtLtabs);
  ltabs.forEach((tabela, i) => {
    const nomeTabela = tabela.NOME;
    const lcamps = tabela.CAMPOS;
    newInfoTabelas.addTabela(nomeTabela);
    newInfoTabelas.setTabelaAtiva(nomeTabela);
    lcamps.forEach((nomeCampo, j) => {
      if (j === 0) {
        newInfoTabelas.setFiltroCampo(nomeCampo)
      }
      newInfoTabelas.addCampo(nomeTabela, nomeCampo)
    })
    let itens = new Array<ItemProps>();
    try {
      itens = require(`../../database/${nomeTabela.toLowerCase()}.json`)
      const txtDados = JSON.stringify(itens.slice(1)).toUpperCase()
      //itens = JSON.parse(txtDados).slice(0, 100);
      itens = JSON.parse(txtDados)
    } catch (error) {
      alert(error)
    }
    newInfoTabelas.setDadosTabela(itens)
    if (Number(i) === ltabs.length - 1) {
      newInfoTabelas.setTabelaAtiva(ltabs[0].NOME);
    }
  })
  return newInfoTabelas;
}

let infoTabelas = new ClassObjetoGlobal();

//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
document.body.style.backgroundColor = "#343a40"
function PaginaInicial() {
  //const [infoTabelas, setInfoTabelas] = useState(new ClassObjetoGlobal())
  const [tabelaAtual, setTabelaAtual] = useState("");
  const [limiteAtual, setLimiteAtual] = useState(10);
  const [campoAtual, setCampoAtual] = useState("");
  const [condicaoAtual, setCondicaoAtual] = useState("");
  const [textoAtual, setTextoAtual] = useState("");
  const [listaFiltroSTR, setListaFiltroSTR] =  useState(new Array<string>());
  //const [filtroAtual, setFiltroAtual] = useState(new ClassFiltroProps());
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    infoTabelas = Object.assign(infoTabelas, initInfoTabelas())
    setDadosFiltroAtual()
  }, []);
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function setFiltroLimite(limite: any) {
    limite = Number(limite)
    infoTabelas.setFiltroLimite(Number(limite));
    setDadosFiltroAtual()
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function setFiltroTabela(tabela: any) {
    tabela = String(tabela)
    infoTabelas.getNomeTabelas.forEach((locTabela) => {
      if (tabela === locTabela) {
        infoTabelas.setTabelaAtiva(locTabela);
        setDadosFiltroAtual()
      }
    })
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function setFiltroCampo(campo: any) {
    campo = String(campo)
    infoTabelas.getTabelaAtiva.listaCampos.forEach((lCampo) => {
      if (lCampo === campo) {
        infoTabelas.setFiltroCampo(campo);
        setDadosFiltroAtual()
      }
    })
    if ("QUALQUER" === campo){
      infoTabelas.setFiltroCampo(campo);
      setDadosFiltroAtual()
    }
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function setFiltroCondicao(locOperacaoFiltro: string) {
    infoTabelas.setFiltroCondicao(locOperacaoFiltro);
    setDadosFiltroAtual()
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function setFiltroTexto(locTextoFiltro: any) {
    locTextoFiltro = String(locTextoFiltro)
    infoTabelas.setFiltroTexto(locTextoFiltro);
    setDadosFiltroAtual()
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function salvaFiltro() {
    let newFil = new ClassFiltroProps();
    newFil = Object.assign(newFil, infoTabelas.getTabelaAtiva.listaFiltros[0])
    infoTabelas.getTabelaAtiva.listaFiltros.push(newFil);
    infoTabelas.setFiltroTexto("");
    setDadosFiltroAtual()
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function limparFiltros() {
    let newFil = new ClassFiltroProps();
    newFil = Object.assign(newFil, infoTabelas.getTabelaAtiva.listaFiltros[0])
    infoTabelas.getTabelaAtiva.listaFiltros = new Array<ClassFiltroProps>(newFil);
    infoTabelas.setFiltroTexto("");
    setDadosFiltroAtual()
  }
  
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  function setDadosFiltroAtual(){
    const { limite, listaFiltros, nome } = infoTabelas.getTabelaAtiva
    const { campo, condicao, texto } = listaFiltros[0]
    setTabelaAtual(nome);
    setLimiteAtual(limite);
    setCampoAtual(campo);
    setCondicaoAtual(condicao);
    setTextoAtual(texto);
    setListaFiltroSTR(listaFiltros.map(e=>(`${e.campo} ${e.condicao} ${e.texto}`)).slice(1));
  }
  //----------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------
  if (infoTabelas.getTabelaAtiva) {
    const { getTabelaAtiva, getNomeTabelas: listaTabelas } = infoTabelas;
    const {
      listaCampos,
      listaFiltros,
      numRegistrosFiltrados: totalFilReg,
      itens,
    } = getTabelaAtiva
    const listaLimite = [10, 50, 100, 500, 1000, 5000]
    const listaCondicao = ["CONTEM", "CONTEM EXATO", "IGUAL", "COMECA"]
    let locArrFill = itens.filter((e) => { return (e.__ativo) })
    locArrFill = locArrFill.slice(0, limiteAtual)

    return (
      <>
        <Tabs className="bg-green" defaultActiveKey={tabelaAtual} id="tab-ListaTabelas" onSelect={setFiltroTabela} transition={false}>
          <Tab title="Consultas PCM" disabled />
            {listaTabelas.map((nTab, i) => (
              <Tab key={i} eventKey={nTab} title={nTab}/>
            ))}
          <Tab title={`${totalFilReg>limiteAtual?limiteAtual:totalFilReg} de ${totalFilReg}`} disabled />
        </Tabs>
        <Navbar className="bg-green" variant="dark" collapseOnSelect expand="lg">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <UserDropDown fOnSelect={alert} id={"dropdown-Lista-Filtros"} title="Lista De Filtros" itens={listaFiltroSTR} itemAtivo={""} />
              <UserDropDown fOnSelect={setFiltroLimite} id={"dropdown-Limite"} title={String("Mostrar "+limiteAtual)} itens={listaLimite} itemAtivo={limiteAtual} />
              <UserDropDown fOnSelect={setFiltroCampo} id={"dropdown-Campo"} title={"FILTRAR COLUNA: "+campoAtual} itens={[...listaCampos, "QUALQUER"]} itemAtivo={campoAtual} />
              <UserDropDown fOnSelect={setFiltroCondicao} id={"dropdown-Condicao"} title={condicaoAtual} itens={listaCondicao} itemAtivo={condicaoAtual} />
              <NavDropdown id="dropdown-Teste" title={"teste"}>
                {listaCampos.map((e,i) => (
                  <NavDropdown.ItemText key={i} className="active">
                    <Form.Check type="checkbox" id={`check-api-${e}`}>
                      <Form.Check.Input type="checkbox" isValid />
                      <Form.Check.Label>{e}</Form.Check.Label>
                    </Form.Check>
                  </NavDropdown.ItemText>
                ))}
              </NavDropdown>
              <NavItem>

              </NavItem>
            </Nav>
          </Navbar.Collapse>
          <Form inline>
            <InputGroup>
              <FormControl
                placeholder={`Busca em ${tabelaAtual}`}
                aria-label={`${campoAtual} ${condicaoAtual}`}
                aria-describedby="basic-addon2"
                onChange={ e => {setFiltroTexto(e.target.value.toUpperCase()) }}
                value={textoAtual}
              />
              <InputGroup.Append>
                <Button variant="primary" onClick={salvaFiltro}>Aplicar</Button>
                <Button variant="danger" onClick={limparFiltros}>Limpar</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Navbar>
        <main>
          <table id="listaRegistros" className='table table-dark table-striped'>
            <Thead listaCampos={listaCampos} />
            <Tbody itens={locArrFill} listaCampos={listaCampos} />
          </table>
        </main>
      </>
    )
  }
  else {
    return (<div>Carregando...</div>)
  }
}


export default PaginaInicial;