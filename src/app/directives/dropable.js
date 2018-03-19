app
    .directive("taskDrop", function () {
        return {
            restrict: "A",
            scope: {
                column: '=',
                onDrop: '&'
            },
            link: function (scope, element, attrs) {

                element
                    .bind("dragover", function (e) {
                        if (e.preventDefault) {
                            e.preventDefault(); // Necessary. Allows us to drop.
                        }

                        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
                        return false;
                    });

                element.bind("dragenter", function (e) {
                    // this / e.target is the current hover target.
                    angular
                        .element(e.target)
                        .addClass('task-over');
                });

                element.bind("dragleave", function (e) {
                    angular
                        .element(e.target)
                        .removeClass('task-over'); // this / e.target is previous target element.
                });

                element.bind("drop", function (e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.stopPropagation) {
                        e.stopPropagation(); // Necessary. Allows us to drop.
                    }
                    var data = e
                        .dataTransfer
                        .getData("task");
                    console.log('drop', JSON.parse(data));

                    scope.onDrop({
                        task: JSON.parse(data)
                    });
                });
            },
            controller: function ($scope) {}
        };
    });