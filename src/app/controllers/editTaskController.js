app
    .controller('editTaskController', function ($scope, $log, $uibModalInstance, task) {
        $log.info(task)
        $scope.task = task;
        $scope.taskBackup = angular.copy(task);
        $scope.save = function () {
            $uibModalInstance.close();
        };

        $scope.restore = function () {
            $scope.task.summary = $scope.taskBackup.summary;
            $scope.task.content = $scope.taskBackup.content;
        };

        $scope.cancel = function () {
            $scope.restore();
            $uibModalInstance.dismiss('cancel');
        };

    });