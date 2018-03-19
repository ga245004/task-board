app
    .controller('taskController', function ($scope, taskService) {
        $scope.boardColumns = ["ToDo", "In Progress", "Completed"]
        $scope.tasks = taskService.get();
        $scope.addTask = function () {
            //var tasks = $scope.tasks[$scope.boardColumns[0]];
            var task = taskService.add({content: "New Task", status: 0});
            task.id = $scope.tasks.length;
            $scope
                .tasks
                .push(task);
        }

        $scope.taskChange = function (status, task) {
            console.log(status, task);

            var oldTask = _.filter($scope.tasks, task);
            console.log(oldTask);
            if (oldTask.length > 0) {
                oldTask[0].status = status;
            }
            $scope.$apply();
        }

    });