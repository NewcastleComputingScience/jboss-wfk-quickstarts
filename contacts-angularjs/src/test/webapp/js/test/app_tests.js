'use strict';
/*
 * JBoss, Home of Professional Open Source
 * Copyright 2014, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Unit tests that cover the basic functionality of app.js
 */

//Initialise Angular.js dependency injection and perform other setup
var injector = angular.injector(['ng', 'contacts', 'contactsTests']);
var $httpBackend = injector.get('$httpBackend');
var $httpProvider = httpProvider;
var $http = injector.get('$http');

//Perform per-test setup
var init = {
    setup: function() {}
};

//app.js tests module
QUnit.module('app_tests', init);

QUnit.test('"ajaxNonceInterceptor" initialised successfully.', function(assert) {
    assert.ok($httpProvider.interceptors.indexOf('ajaxNonceInterceptor') > -1);
});

//QUnit.test('"ajaxNonceInterceptor" functions correctly.', function(assert) {
//    //TODO: Work out why $http.get(...).success(...); doesn't work outside a controller.
//    $httpBackend.expectGET(/[?&]_=[0-9]+$/).respond(200);
//    $http.get('/foo').success(function(data) {
//        assert.equal(data.status, 200);
//    });
//    $httpBackend.flush();
//});

//No test to verify routes as testing configuration is inherently circular and Angular.js already tests $routeProvider
