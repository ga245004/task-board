app
    .filter('filterTasks', function () {
        return function (tasks, boardColumn) {
            return _.filter(tasks, {'status': boardColumn});
        };
    });