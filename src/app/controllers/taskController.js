app
    .controller('taskController', function ($scope, taskService, $uibModal, $log, markdownService) {
        $scope.boardColumns = ["ToDo", "In Progress", "Completed"]
        $scope.tasks = taskService.get();
        $scope.addTask = function () {

            var modalInstance = $uibModal.open({animation: $scope.animation, templateUrl: 'app/templates/new-task.html', controller: 'newTaskController', windowClass: 'add-task-modal'});
            modalInstance
                .result
                .then(function (newTask) {
                    $log.info(newTask);
                    $scope.AddNewTask(newTask)
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

        }

        $scope.AddNewTask = function (newTask) {
            var task = taskService.add(newTask);
            task.id = $scope.tasks.length;
            $scope
                .tasks
                .push(task);
        }

        $scope.taskChange = function (status, task) {
            var oldTask = _.filter($scope.tasks, task);
            
            if (oldTask.length > 0) {
                oldTask[0].status = status;
            }
            $scope.$apply();
        }

    });