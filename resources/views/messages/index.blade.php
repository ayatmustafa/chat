@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
       <div class="col-md-4">
           <h3>Online Users</h3>
           <hr>
           <h5 id="no-online-users">no online users</h5>
         <div class="list-group" id="online-users">

          <!--end list group-->
         </div>
       </div>
       <div class="col-md-8 d-flex flex-column" style="height: 80vh">
        <div class="h-100 p-5 mb-4 bg-white" id="chat" style="overflow-y: scroll;">
            @foreach ( $messages as $message )
                <div  class="mt-4 mr-4 w-50 text-white p-3 rounded   {{auth()->user()->id==$message->user_id?' bg-success  float-right':' float-left bg-primary'}}">
                    <p>{{ $message->user->name}}</p>
                    <p>{{ $message->body}}</p>
                </div>
            @endforeach

        </div>
        <form action="" class="d-flex">
            <input type="text"class="form-control mr-2" name="" data-url="{{route("message.store")}}" id="chat-text">
            <input type="submit" class="btn btn-primary" value="send">
       </form>
        </form>

       </div>
    </div>
</div>
@endsection

