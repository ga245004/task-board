app
    .service('taskService', function () {
        this.get = function (columns) {
            return getRandomTask(25, columns.length);
        }

        this.add = function (task) {
            return task;
        }
    });

function getRandomTask(totalTask, columns) {
    var tasks = [];
    for (var i = 1; i <= totalTask; i++) {
        tasks.push({
            id: i,
            summary: "<b>Task</b>" + i,
            status: Math.floor((Math.random() * columns))
        })
    }
    return tasks;
}