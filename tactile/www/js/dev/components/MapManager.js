var MapManager = {
    init: function(){
        var map;

        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function(position) {

            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                zoom: 12,
                center: myLatlng
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
