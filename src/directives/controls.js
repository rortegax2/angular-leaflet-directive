angular.module("leaflet-directive").directive('controls', function ($log, leafletHelpers) {
    return {
        restrict: "A",
        scope: false,
        replace: false,
        require: '?^leaflet',

        link: function(scope, element, attrs, controller) {
            if(!controller) {
                return;
            }

            var isDefined = leafletHelpers.isDefined,
                leafletScope  = controller.getLeafletScope(),
                controls = leafletScope.controls;

            controller.getMap().then(function(map) {
                if (isDefined(L.Control.Draw) && isDefined(controls.draw)) {
                    var drawnItems = new L.FeatureGroup();
                    var options = {
                        edit: {
                            featureGroup: drawnItems
                        }
                    };
                    angular.extend(options, controls.draw);
                    controls.draw = options;
                    map.addLayer(options.edit.featureGroup);

                    var drawControl = new L.Control.Draw(options);
                    map.addControl(drawControl);
                }

                if(isDefined(controls.custom)) {
                    for(var i=0; i<controls.custom.length; i++) {
                        map.addControl(controls.custom[i]);
                    }
                }
            });
        }
    };
});
