$(document).ready(function () {
    let loader = $('.lds-ring');
    let mensagemSucesso = $('.mensagem.sucesso');
    let mensagemErro = $('.mensagem.erro');

    loader.hide();
    mensagemSucesso.hide();
    mensagemErro.hide();

    $('#form').submit(function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const url = 'http://gruponazarao.com.br/controller/controllerFormContato.php';

      $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function () {
          loader.show();
          mensagemSucesso.hide();
          mensagemErro.hide();
        },
        success: function (response) {
          console.log('Resposta do servidor:', response);
          // Exibe a mensagem de sucesso
          mensagemSucesso.show();
          // Oculta a mensagem de sucesso após 3 segundos
          setTimeout(function () {
            mensagemSucesso.hide();
          }, 3000);
        },
        error: function (xhr, status, error) {
          console.error('Erro ao enviar formulário. Código de status:', xhr.status);
          // Exibe a mensagem de erro
          mensagemErro.show();
          // Oculta a mensagem de erro após 3 segundos
          setTimeout(function () {
            mensagemErro.hide();
          }, 3000);
        },
        complete: function () {
          loader.hide();
        }
      });
    });
  });