app
    .controller('taskController', function ($scope, taskService, $uibModal, $log, markdownService) {
        $scope.boardColumns = ["ToDo", "In Progress", "Completed", "Verified"]
        $scope.tasks = taskService.get($scope.boardColumns);
        $scope.newTaskModalTempalate = {
            animation: $scope.animation,
            templateUrl: 'app/templates/task/new-task.html',
            controller: 'newTaskController',
            windowClass: 'add-task-modal',
            backdrop: 'static'
        }

        $scope.viewTaskModalTemplate = {
            animation: $scope.animation,
            templateUrl: 'app/templates/task/view-task.html',
            controller: 'viewTaskController',
            windowClass: 'view-task-modal',
            backdrop: 'static',
            resolve: {
                task: function () {
                    return $scope.selectedTask;
                }
            }
        }

        $scope.addTaskModal = function () {
            var modalInstance = $uibModal.open($scope.newTaskModalTempalate);
            modalInstance
                .result
                .then($scope.AddNewTask, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        }

        $scope.viewTaskModal = function (task) {
            $scope.selectedTask = task;
            var modalInstance = $uibModal.open($scope.viewTaskModalTemplate);

            modalInstance
                .result
                .then(function () {
                    $log.info('Modal dismissed at: ' + new Date());
                    $scope.selectedTask = null;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                    $scope.selectedTask = null;
                });
        }

        $scope.AddNewTask = function (newTask) {
            $log.info(newTask);
            var task = taskService.add(newTask);
            task.id = $scope.tasks.length;
            $scope
                .tasks
                .push(task);
        }

        $scope.taskChange = function (status, dragData, dropData) {
            console.log(status, dragData, dropData)
            var oldTask = _.filter($scope.tasks, dragData);

            if (oldTask.length > 0) {
                oldTask[0].status = status;
            }
            $scope.$apply();
        }

    });