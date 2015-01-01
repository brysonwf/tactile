var MapManager = {
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
