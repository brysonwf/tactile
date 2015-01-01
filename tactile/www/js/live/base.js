var CameraManager = {
    init: function () {

        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value

        // Wait for device API libraries to load
        //
        document.addEventListener("deviceready",onDeviceReady,false);

        // device APIs are available
        //
        function onDeviceReady() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        }

        // Called when a photo is successfully retrieved
        //
        function onPhotoDataSuccess(imageData) {
            // Uncomment to view the base64-encoded image data
            // console.log(imageData);

            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        // Called when a photo is successfully retrieved
        //
        function onPhotoURISuccess(imageURI) {
            // Uncomment to view the image file URI
            // console.log(imageURI);

            // Get image handle
            //
            var largeImage = document.getElementById('largeImage');

            // Unhide image elements
            //
            largeImage.style.display = 'block';

            // Show the captured photo
            // The in-line CSS rules are used to resize the image
            //
            largeImage.src = imageURI;
        }

        // A button will call this function
        //
        function capturePhoto() {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                destinationType: destinationType.DATA_URL });
        }

        // A button will call this function
        //
        function capturePhotoEdit() {
            // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                destinationType: destinationType.DATA_URL });
        }

        // A button will call this function
        //
        function getPhoto(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                destinationType: destinationType.FILE_URI,
                sourceType: source });
        }

        // Called if something bad happens.
        //
        function onFail(message) {
            alert('Failed because: ' + message);
        }


        $('.capture-photo').on('click',function(){
            capturePhoto();
        });
        $('.capture-editable').on('click',function(){
            capturePhotoEdit();
        });
        $('.capture-library').on('click',function(){
            getPhoto(pictureSource.PHOTOLIBRARY);
        });
        $('.capture-album').on('click',function(){
            getPhoto(pictureSource.SAVEDPHOTOALBUM);
        });

    }
}
;/*
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
};;var MapManager = {
    init: function(){

        var map;

        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function(position) {

            console.log('Working from '+position.coords.latitude+', '+position.coords.longitude);

            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                zoom: 12,
                center: myLatlng
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


            $.getJSON( "http://bryson.mojostuff.com/tactile/client.php?u=$59@", function( data ) {
                $.each( data, function( key, val ) {
                    var obj = jQuery.parseJSON( JSON.stringify(val) );

                    console.log(obj.lat);
                    var markerLatLong = new google.maps.LatLng(obj.lat, obj.lng);

                    var marker = new google.maps.Marker({
                        position: markerLatLong,
                        map: map,
                        title: 'asdf'
                    });

                    // To add the marker to the map, call setMap();
                    marker.setMap(map);
                });
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Hello World!'
            });
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
}
;jQuery(document).ready(function(){

    //app.initialize();
    MapManager.init();
    CameraManager.init();
    //DataManager.init();

});
