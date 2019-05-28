$(function(){
  
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html = `<div class="message" data-message=${message.id}>
    <div class="upper-message">
      <div class="upper-message__user-name">
        ${message.user_name}
      </div>
      <div class="upper-message__date">
        ${message.created_at}
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

  $('#new_message').on('submit', function(e){
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
    .done(function(data) {
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
  })

    var reloadMessages = function() {
      var last_message_id = $('.message:last').data('message');
      // {data: {message: message.id}}
      $.ajax({
        url: "./api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(data) {
        var insertHTML = '';
        // if(message.length !== 0){
       data.forEach(function(last_message){
         insertHTML += buildHTML(last_message)
        })
         $('.messages').append(insertHTML);
         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // 通信失敗時の処理
        alert('ファイルの取得に失敗しました。');
        console.log("ajax通信に失敗しました");
        console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
        console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
        console.log("errorThrown    : " + errorThrown.message); // 例外情報
        console.log("URL            : " + url);
      })
        };


        var pathname = location.pathname.match(/messages/)
        var reg = RegExp(pathname);
        if(reg.test("messages")){
          setInterval(reloadMessages,5000);
        }
      });