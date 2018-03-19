app
    .directive("drag", function () {
        return {
            restrict: "A",
            scope: {
                dragData: '=',
                drag: '&'
            },
            link: function (scope, element, attrs) {
                angular
                    .element(element)
                    .attr('draggable', 'true');

                element.bind("dragstart", function (e) {
                    e.dataTransfer = e.originalEvent.dataTransfer;
                    e
                        .dataTransfer
                        .setData('dragData', JSON.stringify(scope.dragData));
                });

                element.bind("dragend", function (e) {
                    console.log('dragend', scope.dragData)
                });
            },
            controller: function ($scope) {}
        };
    });