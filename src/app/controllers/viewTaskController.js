app
    .controller('viewTaskController', function ($scope, $uibModalInstance, task) {
        $scope.task = task;
        $scope.edit = function () {
            $uibModalInstance.close(true);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });