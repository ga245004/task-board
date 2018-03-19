app
    .directive("taskDrag", function () {
        return {
            restrict: "A",
            scope: {
                taskDrag: '=',
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
                        .setData('task', JSON.stringify(scope.taskDrag));
                });

                element.bind("dragend", function (e) {
                    console.log('dragend', scope.taskDrag)
                });
            },
            controller: function ($scope) {}
        };
    });