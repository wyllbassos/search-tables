"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ClassInfoTabela = void 0;
var react_1 = require("react");
//import InputGroup from './components/inputgroup';
var tbody_1 = require("./components/tbody");
var thead_1 = require("./components/thead");
require("./styles.css");
var react_bootstrap_1 = require("react-bootstrap");
var index_1 = require("./components/userDropdown/index");
var ClassInfoTabela = /** @class */ (function () {
    function ClassInfoTabela(nome) {
        this.numRegistrosFiltrados = 0;
        this.limite = 10;
        this.nome = "";
        this.itens = new Array();
        this.campos = new Array();
        this.listaCampos = new Array();
        this.ativo = true;
        this.listaFiltros = new Array(new ClassFiltroProps());
        this.nome = nome;
    }
    return ClassInfoTabela;
}());
exports.ClassInfoTabela = ClassInfoTabela;
var ClassFiltroProps = /** @class */ (function () {
    function ClassFiltroProps() {
        this.campo = "";
        this.condicao = "CONTEM";
        this.operacao = "";
        this.texto = "";
    }
    return ClassFiltroProps;
}());
var ClassObjetoGlobal = /** @class */ (function () {
    function ClassObjetoGlobal() {
        //--------------------------------
        //    V A R I A V E I S
        //--------------------------------
        this.listaTabela = [];
        this.tabelaAtiva = "";
        this.infoTabelas = {}; // = new Array<listaTabelasProps>();
    }
    ClassObjetoGlobal.prototype.aplicaFiltro = function () {
        var _this = this;
        console.log(this.getTabelaAtiva.listaFiltros);
        this.getTabelaAtiva.numRegistrosFiltrados = 0;
        this.getTabelaAtiva.itens.map(function (element) { element.__ativo = true; return element; });
        try {
            this.getTabelaAtiva.itens.map(function (element) {
                var bRet = true;
                _this.getTabelaAtiva.listaFiltros.forEach(function (filtro) {
                    var campo = filtro.campo, texto = filtro.texto, condicao = filtro.condicao;
                    texto = String(texto.toUpperCase());
                    if (texto !== "") {
                        var valueCampo_1 = "";
                        if (campo === "QUALQUER CAMPO" && (condicao === "CONTEM" || condicao === "CONTEM EXATO"))
                            _this.getTabelaAtiva.listaCampos.forEach(function (lCampo) {
                                valueCampo_1 += String(element[lCampo]) + "\t";
                            });
                        else
                            valueCampo_1 = String(element[campo]);
                        switch (condicao) {
                            case ("CONTEM"):
                                var arrTexto = texto.split(" ");
                                bRet = bRet && true;
                                for (var index = 0; index < arrTexto.length; index++) {
                                    var locTexto = arrTexto[index];
                                    if (!bRet)
                                        continue;
                                    if (locTexto !== "")
                                        bRet = bRet && valueCampo_1.indexOf(locTexto) > -1;
                                }
                                break;
                            case ("CONTEM EXATO"):
                                bRet = bRet && valueCampo_1.indexOf(texto) > -1;
                                break;
                            case ("IGUAL"):
                                if (!(campo === "QUALQUER CAMPO"))
                                    bRet = bRet && element[campo] === texto;
                                else {
                                    var lbRet_1 = false;
                                    _this.getTabelaAtiva.listaCampos.forEach(function (lCampo) {
                                        lbRet_1 = lbRet_1 || element[lCampo] === texto;
                                    });
                                    bRet = bRet && lbRet_1;
                                }
                                break;
                            case ("COMECA"):
                                bRet = bRet && (valueCampo_1.slice(0, texto.length)) === texto;
                                break;
                            default:
                                break;
                        }
                    }
                });
                element.__ativo = element.__ativo && bRet;
                if (bRet)
                    _this.getTabelaAtiva.numRegistrosFiltrados++;
                //this.setDadosSplit();
                return element;
            });
        }
        catch (error) {
            console.log(error, this.getTabelaAtiva.listaFiltros);
        }
    };
    //--------------------------------
    //    D A D O S   F I L T R O S
    //--------------------------------
    //--------------------------------
    //S E T S   -   F I L T R O S
    //--------------------------------
    ClassObjetoGlobal.prototype.setFiltroLimite = function (limite) {
        this.getTabelaAtiva.limite = limite;
    };
    ClassObjetoGlobal.prototype.setFiltroCampo = function (campo) {
        this.getTabelaAtiva.listaFiltros[0].campo = campo;
        this.aplicaFiltro();
    };
    ClassObjetoGlobal.prototype.setFiltroCondicao = function (condicao) {
        this.getTabelaAtiva.listaFiltros[0].condicao = condicao;
        this.aplicaFiltro();
    };
    ClassObjetoGlobal.prototype.setFiltroTexto = function (texto) {
        this.getTabelaAtiva.listaFiltros[0].texto = texto;
        this.aplicaFiltro();
    };
    ClassObjetoGlobal.prototype.setFiltroOperacao = function (operacao) {
        this.getTabelaAtiva.listaFiltros[0].operacao = operacao;
        this.aplicaFiltro();
    };
    //--------------------------------
    //    D A D O S   T A B E L A S
    //--------------------------------
    //--------------------------------
    //A D D S   -   T A B E L A S
    //--------------------------------
    ClassObjetoGlobal.prototype.addTabela = function (tabela) {
        this.infoTabelas[tabela] = new ClassInfoTabela(tabela);
        this.listaTabela.push(tabela);
        //this.numTabelas++;
    };
    ClassObjetoGlobal.prototype.addCampo = function (tabela, campo) {
        this.infoTabelas[tabela].campos.push({ nome: campo, ativo: true });
        this.infoTabelas[tabela].listaCampos.push(campo);
    };
    ClassObjetoGlobal.prototype.addOptionTabela = function (tabela) {
        this.listaTabela.push(tabela);
    };
    //--------------------------------
    //S E T S   -   T A B E L A S
    //--------------------------------
    ClassObjetoGlobal.prototype.setDadosTabela = function (itens) {
        var _this = this;
        this.getTabelaAtiva.itens = itens;
        this.getTabelaAtiva.numRegistrosFiltrados = 0;
        itens.map(function (item, i) {
            _this.getTabelaAtiva.numRegistrosFiltrados++;
            item.__ativo = true;
            return item;
        });
    };
    ClassObjetoGlobal.prototype.setTabelaAtiva = function (tabela) {
        if (this.infoTabelas[tabela])
            this.tabelaAtiva = tabela;
    };
    Object.defineProperty(ClassObjetoGlobal.prototype, "getTabelaAtiva", {
        //--------------------------------
        //G E T S   -   T A B E L A S
        //--------------------------------
        get: function () {
            return this.infoTabelas[this.tabelaAtiva];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClassObjetoGlobal.prototype, "getNomeTabelas", {
        get: function () {
            return this.listaTabela;
        },
        enumerable: false,
        configurable: true
    });
    return ClassObjetoGlobal;
}());
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
function initInfoTabelas() {
    var newInfoTabelas = new ClassObjetoGlobal();
    var ltabs = require("../../database/tabelas.json");
    var txtLtabs = JSON.stringify(ltabs).toUpperCase();
    ltabs = JSON.parse(txtLtabs);
    ltabs.forEach(function (tabela, i) {
        var nomeTabela = tabela.NOME;
        var lcamps = tabela.CAMPOS;
        newInfoTabelas.addTabela(nomeTabela);
        newInfoTabelas.setTabelaAtiva(nomeTabela);
        lcamps.forEach(function (nomeCampo, j) {
            if (j === 0) {
                newInfoTabelas.setFiltroCampo(nomeCampo);
            }
            newInfoTabelas.addCampo(nomeTabela, nomeCampo);
        });
        var itens = new Array();
        try {
            itens = require("../../database/" + nomeTabela.toLowerCase() + ".json");
            var txtDados = JSON.stringify(itens.slice(1)).toUpperCase();
            //itens = JSON.parse(txtDados).slice(0, 100);
            itens = JSON.parse(txtDados);
        }
        catch (error) {
            alert(error);
        }
        newInfoTabelas.setDadosTabela(itens);
        if (Number(i) === ltabs.length - 1) {
            newInfoTabelas.setTabelaAtiva(ltabs[0].NOME);
        }
    });
    return newInfoTabelas;
}
var infoTabelas = new ClassObjetoGlobal();
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
document.body.style.backgroundColor = "#343a40";
function PaginaInicial() {
    //const [infoTabelas, setInfoTabelas] = useState(new ClassObjetoGlobal())
    var _a = react_1.useState(""), tabelaAtual = _a[0], setTabelaAtual = _a[1];
    var _b = react_1.useState(10), limiteAtual = _b[0], setLimiteAtual = _b[1];
    var _c = react_1.useState(""), campoAtual = _c[0], setCampoAtual = _c[1];
    var _d = react_1.useState(""), condicaoAtual = _d[0], setCondicaoAtual = _d[1];
    var _e = react_1.useState(""), textoAtual = _e[0], setTextoAtual = _e[1];
    var _f = react_1.useState(new Array()), listaFiltroSTR = _f[0], setListaFiltroSTR = _f[1];
    //const [filtroAtual, setFiltroAtual] = useState(new ClassFiltroProps());
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    react_1.useEffect(function () {
        infoTabelas = Object.assign(infoTabelas, initInfoTabelas());
        setDadosFiltroAtual();
    }, []);
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function setFiltroLimite(limite) {
        limite = Number(limite);
        infoTabelas.setFiltroLimite(Number(limite));
        setDadosFiltroAtual();
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function setFiltroTabela(tabela) {
        tabela = String(tabela);
        infoTabelas.getNomeTabelas.forEach(function (locTabela) {
            if (tabela === locTabela) {
                infoTabelas.setTabelaAtiva(locTabela);
                setDadosFiltroAtual();
            }
        });
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function setFiltroCampo(campo) {
        campo = String(campo);
        infoTabelas.getTabelaAtiva.listaCampos.forEach(function (lCampo) {
            if (lCampo === campo) {
                infoTabelas.setFiltroCampo(campo);
                setDadosFiltroAtual();
            }
        });
        if ("QUALQUER CAMPO" === campo) {
            infoTabelas.setFiltroCampo(campo);
            setDadosFiltroAtual();
        }
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function setFiltroCondicao(locOperacaoFiltro) {
        infoTabelas.setFiltroCondicao(locOperacaoFiltro);
        setDadosFiltroAtual();
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function setFiltroTexto(locTextoFiltro) {
        locTextoFiltro = String(locTextoFiltro);
        infoTabelas.setFiltroTexto(locTextoFiltro);
        setDadosFiltroAtual();
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function salvaFiltro() {
        var newFil = new ClassFiltroProps();
        newFil = Object.assign(newFil, infoTabelas.getTabelaAtiva.listaFiltros[0]);
        infoTabelas.getTabelaAtiva.listaFiltros.push(newFil);
        infoTabelas.setFiltroTexto("");
        setDadosFiltroAtual();
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function limparFiltros() {
        var newFil = new ClassFiltroProps();
        newFil = Object.assign(newFil, infoTabelas.getTabelaAtiva.listaFiltros[0]);
        infoTabelas.getTabelaAtiva.listaFiltros = new Array(newFil);
        infoTabelas.setFiltroTexto("");
        setDadosFiltroAtual();
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    function setDadosFiltroAtual() {
        var _a = infoTabelas.getTabelaAtiva, limite = _a.limite, listaFiltros = _a.listaFiltros, nome = _a.nome;
        var _b = listaFiltros[0], campo = _b.campo, condicao = _b.condicao, texto = _b.texto;
        setTabelaAtual(nome);
        setLimiteAtual(limite);
        setCampoAtual(campo);
        setCondicaoAtual(condicao);
        setTextoAtual(texto);
        setListaFiltroSTR(listaFiltros.map(function (e) { return (e.campo + " " + e.condicao + " " + e.texto); }).slice(1));
    }
    //----------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------
    if (infoTabelas.getTabelaAtiva) {
        var getTabelaAtiva = infoTabelas.getTabelaAtiva, listaTabelas = infoTabelas.getNomeTabelas;
        var listaCampos = getTabelaAtiva.listaCampos, listaFiltros = getTabelaAtiva.listaFiltros, totalFilReg = getTabelaAtiva.numRegistrosFiltrados, itens = getTabelaAtiva.itens;
        var listaLimite = [10, 50, 100, 500, 1000, 5000];
        var listaCondicao = ["CONTEM", "CONTEM EXATO", "IGUAL", "COMECA"];
        var locArrFill = itens.filter(function (e) { return (e.__ativo); });
        locArrFill = locArrFill.slice(0, limiteAtual);
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_bootstrap_1.Tabs, { className: "bg-green", defaultActiveKey: tabelaAtual, id: "tab-ListaTabelas", onSelect: setFiltroTabela, transition: false },
                react_1["default"].createElement(react_bootstrap_1.Tab, { title: "Consultas PCM", disabled: true }),
                listaTabelas.map(function (nTab, i) { return (react_1["default"].createElement(react_bootstrap_1.Tab, { key: i, eventKey: nTab, title: nTab })); }),
                react_1["default"].createElement(react_bootstrap_1.Tab, { title: (totalFilReg > limiteAtual ? limiteAtual : totalFilReg) + " de " + totalFilReg, disabled: true })),
            react_1["default"].createElement(react_bootstrap_1.Navbar, { className: "bg-green", variant: "dark", collapseOnSelect: true, expand: "lg" },
                react_1["default"].createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "responsive-navbar-nav" }),
                react_1["default"].createElement(react_bootstrap_1.Navbar.Collapse, { id: "responsive-navbar-nav" },
                    react_1["default"].createElement(react_bootstrap_1.Nav, { className: "mr-auto" },
                        react_1["default"].createElement(index_1["default"], { fOnSelect: alert, id: "dropdown-Lista-Filtros", title: "Lista De Filtros", itens: listaFiltroSTR, itemAtivo: "" }),
                        react_1["default"].createElement(index_1["default"], { fOnSelect: setFiltroLimite, id: "dropdown-Limite", title: String("Mostrar " + limiteAtual), itens: listaLimite, itemAtivo: limiteAtual }),
                        react_1["default"].createElement(index_1["default"], { fOnSelect: setFiltroCampo, id: "dropdown-Campo", title: "FILTRAR COLUNA: " + campoAtual, itens: __spreadArrays(listaCampos, ["QUALQUER CAMPO"]), itemAtivo: campoAtual }),
                        react_1["default"].createElement(index_1["default"], { fOnSelect: setFiltroCondicao, id: "dropdown-Condicao", title: condicaoAtual, itens: listaCondicao, itemAtivo: condicaoAtual }),
                        react_1["default"].createElement(react_bootstrap_1.NavDropdown, { id: "dropdown-Teste", title: "teste" }, listaCampos.map(function (e, i) { return (react_1["default"].createElement(react_bootstrap_1.NavDropdown.ItemText, { key: i, className: "active" },
                            react_1["default"].createElement(react_bootstrap_1.Form.Check, { type: "checkbox", id: "check-api-" + e },
                                react_1["default"].createElement(react_bootstrap_1.Form.Check.Input, { type: "checkbox", isValid: true }),
                                react_1["default"].createElement(react_bootstrap_1.Form.Check.Label, null, e)))); })),
                        react_1["default"].createElement(react_bootstrap_1.NavItem, null))),
                react_1["default"].createElement(react_bootstrap_1.Form, { inline: true },
                    react_1["default"].createElement(react_bootstrap_1.InputGroup, null,
                        react_1["default"].createElement(react_bootstrap_1.FormControl, { placeholder: "Busca em " + tabelaAtual, "aria-label": campoAtual + " " + condicaoAtual, "aria-describedby": "basic-addon2", onChange: function (e) { setFiltroTexto(e.target.value.toUpperCase()); }, value: textoAtual }),
                        react_1["default"].createElement(react_bootstrap_1.InputGroup.Append, null,
                            react_1["default"].createElement(react_bootstrap_1.Button, { variant: "primary", onClick: salvaFiltro }, "Aplicar"),
                            react_1["default"].createElement(react_bootstrap_1.Button, { variant: "danger", onClick: limparFiltros }, "Limpar"))))),
            react_1["default"].createElement("main", null,
                react_1["default"].createElement("table", { id: "listaRegistros", className: 'table table-dark table-striped' },
                    react_1["default"].createElement(thead_1["default"], { listaCampos: listaCampos }),
                    react_1["default"].createElement(tbody_1["default"], { itens: locArrFill, listaCampos: listaCampos })))));
    }
    else {
        return (react_1["default"].createElement("div", null, "Carregando..."));
    }
}
exports["default"] = PaginaInicial;
