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

        $scope.editTaskModalTemplate = {
            animation: $scope.animation,
            templateUrl: 'app/templates/task/edit-task.html',
            controller: 'editTaskController',
            windowClass: 'edit-task-modal',
            backdrop: 'static',
            resolve: {
                task: function () {
                    return $scope.selectedTask;
                }
            }
        }

        $scope.deleteTaskModalTemplate = {
            animation: $scope.animation,
            templateUrl: 'app/templates/common/confirmation-dialog.html',
            windowClass: 'edit-task-modal',
            resolve: {
                dialog: function () {
                    return {
                        header: 'Are you sure?',
                        body: 'You are about to delete the task <br />' + $scope.selectedTask.summary
                    };
                }
            },
            controller: function ($scope, dialog, $uibModalInstance) {
                $scope.dialog = dialog;
                $scope.dialog.nofn = function () {
                    $uibModalInstance.close('no');
                    if (dialog.no) {
                        dialog.no()
                    }
                };
                $scope.dialog.yesfn = function () {
                    $uibModalInstance.close('yes');
                    if (dialog.yes) {
                        dialog.yes()
                    }
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
                .then(function (isEdit) {
                    if (isEdit) {
                        $scope.editTaskModal($scope.selectedTask);
                    } else {
                        $scope.selectedTask = null;
                    }
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                    $scope.selectedTask = null;
                });
        }

        $scope.editTaskModal = function (task) {
            $scope.selectedTask = task;
            var modalInstance = $uibModal.open($scope.editTaskModalTemplate);

            modalInstance
                .result
                .then(function () {
                    $scope.selectedTask = null;
                    $log.info('Modal dismissed at: ' + new Date());
                }, function () {
                    $scope.selectedTask = null;
                    $log.info('Modal dismissed at: ' + new Date());
                });
        }

        $scope.deleteTaskModal = function (task) {
            $scope.selectedTask = task;
            var modalInstance = $uibModal.open($scope.deleteTaskModalTemplate);

            modalInstance
                .result
                .then(function (anwser) {
                    if (anwser == 'yes') {
                        $scope.deleteTask($scope.selectedTask);
                    }
                    $scope.selectedTask = null;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                    $scope.selectedTask = null;
                });
        }

        $scope.deleteTask = function (task) {
            $log.info(task);
            var taskIndex = taskService.delete(task);
            $scope
                .tasks
                .splice(taskIndex, 1);
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