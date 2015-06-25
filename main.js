
var converterApp = angular.module("converterApp", []);
converterApp.constant("DEFAULT_VALUE", 240);

converterApp.controller("converter", function($scope, DEFAULT_VALUE) {
	
	$scope.sliderConfig = {
        min: 0,
        max: 255,
        step: 1,
		value: DEFAULT_VALUE
    }
	
	$scope.red = DEFAULT_VALUE;
	$scope.green = DEFAULT_VALUE;
	$scope.blue = DEFAULT_VALUE;

    $scope.setValue = function(value) {
        $scope.value = value;    
    }
	
    $scope.getColor = function() {
        return rgbToHex($scope.red, $scope.green, $scope.blue);    
    }
});

converterApp.directive("slider", function() {
    return {
        restrict: 'A',
        scope: {
            config: "=config",
            value: "=model"
        },
        link: function(scope, elem, attrs) {
            var setModel = function(value) {
                scope.model = value;   
				console.log(value);
            }
            
            $(elem).slider({
                range: false,
	            min: scope.config.min,
	            max: scope.config.max,
                step: scope.config.step,
				value: scope.config.value,
                slide: function(event, ui) { 
                    scope.$apply(function() {
                        scope.value = ui.value;
                    });
	            }
	        });
    	}
    }
});

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}