function gravarAnotacao(){
    anotacao = new Object();
    anotacao.conteudo = document.getElementById('conteudo').value;
    anotacao.published = new Date();
    gravarNoBanco(anotacao);
}