app
    .service('taskService', function ($localStorage) {
        this.get = function (columns) {
            if (!$localStorage.taskList) {
                $localStorage.taskList = [];
            }

            return $localStorage
                .taskList
                .concat(getRandomTask(0, columns.length));
        }

        this.add = function (task) {
            if (!$localStorage.taskList) {
                $localStorage.taskList = [];
            }

            $localStorage
                .taskList
                .push(task);

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