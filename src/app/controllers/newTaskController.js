app
    .controller('newTaskController', function ($scope, $uibModalInstance) {
        $scope.newTask = {
            status: 0,
            summary: '',
            content: '##New Task'
        };

        $scope.add = function () {
            $uibModalInstance.close($scope.newTask);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });