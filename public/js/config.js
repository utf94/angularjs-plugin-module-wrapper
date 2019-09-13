var app = angular
  .module('inspinia')
  .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    'use strict';
    window._app = app;
    app.stateProvider = $stateProvider;
    app.urlRouterProvider = $urlRouterProvider;
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds
    $urlRouterProvider.otherwise('index');
    $ocLazyLoadProvider.config({
      // Set to true if you want to see what and when is dynamically loaded
      debug: false
    });


    //Get Plugins
    //
    {
      var pluginRequest = new XMLHttpRequest();
      // 
      pluginRequest.open('GET', './json/plugins.json', false); // `false` makes the request synchronous
      pluginRequest.send(null);
      if (pluginRequest.status !== 200) {
        return;
      }
      var pluginData = JSON.parse(pluginRequest.responseText);
      app.plugins = pluginData;
    }
    // Get Routes
    // 
    {
      var request = new XMLHttpRequest();
      // 
      request.open('GET', './json/routes.json', false); // `false` makes the request synchronous
      request.send(null);
      if (request.status !== 200) {
        return;
      }
      var data = JSON.parse(request.responseText);
    }
    var landingState = app.user ? app.user.land : 'index';
    var landingUrl = window.location.href.split('#')[1];

    var loadPlugin = function ($ocLazyLoad) {
      var self = this.self;
      var stateRouter = this;
      var response;
      if (self.preload) {
        return self.loadingResponse;
      }
      var canLoad = self.data && self.data.plugins;
      var isChild = this.path.length > 1;
      //Execution Starts from here
      //
      self.dataLoaders = self.dataLoaders || [];

      if (canLoad) {
        //Load Plugin in case of State is a child or grand child
        var _plugins = stateRouter.path[stateRouter.path.length - 1].data.plugins;
        for (var i = _plugins.length - 1; i >= 0; i--) {
          self.dataLoaders = self.dataLoaders.concat(app.plugins[_plugins[i]]);
        }
      }
      response = $ocLazyLoad.load(self.dataLoaders);
      self.loadingResponse = response;
      self.preload = true;
      return self.loadingResponse;
    };

    for (var i in data.routes) {
      var stateData = data.routes[i][1];
      stateData.data = stateData.data || {};
      stateData.data.plugins = stateData.data.plugins || [];
      stateData.resolve = stateData.resolve || {};
      stateData.resolve.loadPlugin = loadPlugin;
      if (stateData.views) {
        angular.forEach(stateData.views, function (value, key) {
          if (value.dataLoaders) {
            stateData.dataLoaders = stateData.dataLoaders || [];
            angular.forEach(value.dataLoaders, function (value, key) {
              stateData.dataLoaders.push(value);
            });
          }
        });
      }
      if (data.routes[i][1].url === landingUrl) {
        landingState = data.routes[i][0];
      }
      app.stateProvider.state(data.routes[i][0], stateData);
    }
    // window.stateProvider = app.stateProvider;
  });
