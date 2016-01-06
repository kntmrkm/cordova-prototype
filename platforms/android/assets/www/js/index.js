/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};*/

//var mainAppURL = 'http://lvh.me:3000/';
var mainAppURL = 'https://cordova-rails.herokuapp.com';
var settings = {
  host: mainAppURL
};

var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
    angular.module('app', ['onsen']);
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    //app.receivedEvent('deviceready');
    var mainAppButton = document.getElementById('main-app-button');
    mainAppButton.addEventListener('click', app.openMainApp, false);

    var signInButton = document.getElementById('sign-in-button');
    signInButton.addEventListener('click', app.signInProc, false);

    // check href on cordova
    var textArea = document.getElementById('text-area');
    textArea.innerHTML = window.location.href;
    //window.location.href = window.location.href; // this works.

    console.log('onDeviceReady');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    
  },
  openMainApp: function() {
    var encodedHref = encodeURIComponent(window.location.href);
    var ref = window.open(mainAppURL + "?apphome=" + encodedHref, '_self', 'location=yes');
    //var ref = window.open("http://lvh.me:3000/?apphome=" + encodedHref, '_blank', 'location=yes');
  },
  signInProc: function(){
    //clearcache=noでアプリのWebViewとセッション共有
    var ref = window.open(settings.host + '/users/sign_in', '_blank', 'location=yes,clearcache=no');
    ref.addEventListener("loadstop", function(e) {
      if(e.url.match(/profile/)) {
        ref.close();
      }
    });
  }
};



app.initialize();