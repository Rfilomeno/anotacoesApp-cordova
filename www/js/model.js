var db;
var shortName = 'Anotacao';
var version = '1.0';
var displayName = 'Anotacao';
var maxSize = 65535;

function inicializarBanco() {
    if (!window.openDatabase) {
        alert('O navegador não possui suporte a SQL!');
        return;
    }
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Anotacoes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, conteudo TEXT NOT NULL, published DATE)', [], function () {}, errorHandler);
    }, errorHandler, function () {});
}


function gravarNoBanco(anotacao) {
    inicializarBanco();
    db.transaction(function (transaction) {
        transaction.executeSql('INSERT INTO anotacoes(conteudo, published) VALUES (?,?)', [anotacao.conteudo, anotacao.published], function () {}, errorHandler);
    }, errorHandler, successCallBackInserir);
}

function successCallBackInserir() {
    alert('Anotação inserida no Banco com sucesso!');
    VoltarIndex();
}

function errorHandler(error) {
    alert('codigo do erro:' + error.code);
}

function listaDeValores() {
    inicializarBanco();
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * from Anotacoes;', [], mostrarRegistros, errorHandler);
    });
    return;
}

function visualizarAnotacao(id) {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM Anotacoes WHERE id = ?', [id], mostrarAnotacao, errorHandler);
    });
}

function apagarAnotacao() {
    var url = $("#visulizarAnotacao").attr("data-url");
    var id = _GET("id", url);
    if (!window.openDatabase) {
        alert('O navegador não possui suporte a SQL!');
        return;
    }
    db.transaction(function (transaction) {
        transaction.executeSql('DELETE FROM Anotacoes WHERE id = ?', [id], successCallBackDeletar, errorHandler);
    }, errorHandler, nullHandler);
    listaDeValores();
    return false;
}

function successCallBackDeletar(){
    alert('Anotação deletada do banco com sucesso!');
    voltarPagina();
}
function nullHandler(){};

