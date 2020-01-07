require('./bootstrap');
import Echo from "laravel-echo"

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001'
});
let onlineUsersLengh=0;
window.Echo.join(`online`)

    .here((users) => {
        let userId=$("meta[name=user-id]").attr("content");

        let onlineUsersLengh=users.length;
        if(users.length>1){
            $("#no-online-users").css("display","none");
        }
        users.forEach(function (user) {

            if(userId==user.id)
                return
            $("#online-users").append('<a href="#" id="user-'+user.id+'" class="list-group-item list-group-item-action"> <span><i class="fas fa-circle text-success p-2"></i></span>'+user.name+'</a>');
          });

       // console.log(users);
    })
    .joining((user) => {
       // console.log(user.name);
       onlineUsersLengh++;
      // console.log(onlineUsersLengh);
       $('#no-online-users').css("display","none");
       $("#online-users").append('<a href="#" id="user-'+user.id+'" class="list-group-item list-group-item-action"> <span><i class="fas fa-circle text-success p-2"></i></span>'+user.name+'</a>');

    })
    .leaving((user) => {
        onlineUsersLengh--;
       // console.log(onlineUsersLengh);
        if(onlineUsersLengh==1){
            $("#no-online-users").css("display","block");
        }
        $("#user-"+user.id).remove();
   // console.log(user.name);
    });

    $('#chat-text').keypress(function(e){
        if(e.which==13){
            e.preventDefault();
            let body=$(this).val();
            let url=$(this).data('url');
            let userName=$("meta[name=user-name]").attr("content");
            $(this).val('');
            $('#chat').append('<div  class="mt-4 mr-4 w-50 text-white p-3 rounded  float-right bg-success"><p>'+userName+'</p><p>'+body+'</p> </div>')

          //  console.log(url);
           // console.log(body);
            let data={
                '_token': $('meta[name="csrf-token"]').attr('content'),
                body:body
            }
          //  console.log(data);
            $.ajax({
                url:url,
                data:data,
                method:'post',
              //  success:function(){

             //   }
            })
        }

    });//end of key press
   window.Echo.channel('chat-group')
    .listen('.App\Events\MessageDelivered', (e) => {
        console.log(e);
        console.log(e.message.body);
            $('#chat').append(' <div  class="mt-4 mr-4 w-50 text-white p-3 rounded  float-left bg-primary"><p>'+e.message.user.name+'</p><p>'+e.message.body+'</p> </div>')
        });

