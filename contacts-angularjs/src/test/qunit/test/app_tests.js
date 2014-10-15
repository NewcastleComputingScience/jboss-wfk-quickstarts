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
var injector = angular.injector(['ng', 'contacts']);
var httpProvider = injector.get('$httpProvider');
var httpBackend = injector.get('$httpBackend');
var http = injector.get('$http');

//Perform per-test setup
var init = {
    setup: function() {
        this.$scope = injector.get('$rootScope').$new();
    }
};

//app.js tests module
module('app_tests', init);

test('"ajaxNonceInterceptor" initialised successfully.', function() {
    ok(httpProvider.interceptors.indexOf('ajaxNonceInterceptor') > -1);
});

test('"ajaxNonceInterceptor" functions correctly.', function() {
    httpBackend.expectGet('/[?&]_=[0-9]+$/').respond(200);
    http.get('/');
    httpBackend.flush();
});
