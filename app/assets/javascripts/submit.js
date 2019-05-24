$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                    ${content}
                    </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }

  $('#item_form').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.form__submit').prop('disabled', false)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.messages').append(html);
      $('.form__message').val('');
      $('.message_content').val('');
      $('.hidden').val('');
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  });
});
