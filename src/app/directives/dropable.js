app
    .directive("drop", function () {
        return {
            restrict: "A",
            scope: {
                dropData: '=',
                onDrop: '&'
            },
            link: function (scope, element, attrs) {

                element
                    .bind("dragover", function (e) {
                        console.log(e.target);

                        if (!angular.element(e.target).attr('drop')) {
                            return false;
                        }

                        if (e.preventDefault) {
                            e.preventDefault(); // Necessary. Allows us to drop.
                        }
                        e.dataTransfer = e.originalEvent.dataTransfer;
                        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
                        return false;
                    });

                element.bind("dragenter", function (e) {
                    // this / e.target is the current hover target.
                    angular
                        .element(e.target)
                        .addClass('drag-over');
                });

                element.bind("dragleave", function (e) {
                    angular
                        .element(e.target)
                        .removeClass('drag-over'); // this / e.target is previous target element.
                });

                element.bind("drop", function (e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.stopPropagation) {
                        e.stopPropagation(); // Necessary. Allows us to drop.
                    }
                    angular
                        .element(e.target)
                        .removeClass('drag-over');
                    e.dataTransfer = e.originalEvent.dataTransfer;
                    var data = e
                        .dataTransfer
                        .getData("dragData");

                    scope.onDrop({
                        dragData: JSON.parse(data),
                        dropData: scope.dropData
                    });
                });
            },
            controller: function ($scope) {}
        };
    });