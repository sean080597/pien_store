<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Web site created using create-react-app"/>
        <title>PIEU STORE</title>
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="apple-touch-icon" href="{{ asset('logo192.png') }}" />
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}" />
        <link rel="icon" href="{{ asset('favicon.ico') }}" />
        <link rel="manifest" href="{{ asset('manifest.json') }}" />
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <div id='modal-root'></div>
        {{-- <h1>blabvnlayh</h1> --}}
        <script type="text/javascript" src="js/index.js" defer></script>
    </body>
</html>
