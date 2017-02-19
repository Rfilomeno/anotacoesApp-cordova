var db;
var shortName = 'Anotacao';
var version = '1.0';
var displayName = 'Anotacao';
var maxSize = 65535;

function inicializarBanco(){
    if (!window.openDatabase){
        alert('O navegador não possui suporte a SQL!');
        return;
    }
db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(function(tx){
                   tx.executeSql('CREATE TABLE IF NOT EXISTS Anotacoes(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, conteudo TEXT NOT NULL, published DATE)',
                   [], function(){}, errorHandler);}, errorHandler, function(){});
                   }


function gravarNoBanco(anotacao){
    inicializarBanco();
    db.transaction(function(transaction){
        transaction.executeSql('INSERT INTO anotacoes(conteudo, published) VALUES (?,?)',
                              [anotacao.conteudo, anotacao.published], function(){}, errorHandler);
    }, errorHandler, successCallBackInserir);
    }
function successCallBackInserir(){
    alert('Anotação inserida no Banco com sucesso!');
    VoltarIndex();
}
function errorHandler(error){
    alert('codigo do erro:'+error.code);
}