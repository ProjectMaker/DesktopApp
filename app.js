var app = angular.module('app',['ui.router','underscore','uuid','firebase']);

app.controller("SomeController", function($scope){
    $scope.title = "Titre";
    $scope.text = "Contenu";
});