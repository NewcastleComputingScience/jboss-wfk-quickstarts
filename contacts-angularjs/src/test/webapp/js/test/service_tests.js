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
 * Unit tests that cover the basic functionality of services.js
 */

//Initialise Angular.js dependency injection and perform other setup
var injector = angular.injector(['ng', 'contactsServices']);
var messages = injector.get('Messages');

//Simple utility method
var equal = function(left,right) {
    for(var property in left)
    {
        if(!left[property] === right[property])
        {
            return false;
        }
    }
    return true;
};

//Create test data
var testMessage1 = {status: 200, body: 'Ok'};
var testMessage2 = {status: 400, body: 'Bad request'};


//Perform per-test setup
var init = {
    setup: function() {
        messages.push(testMessage1.status, testMessage1.body);
    },
    teardown: function() {
        messages.clear();
    }
};

//services.js tests module
QUnit.module('service_tests', init);

QUnit.test('Can retrieve messages stored', function(assert) {
    assert.ok(messages.get().length === 1);
    assert.equal(messages.get()[0], testMessage1);
});

QUnit.test('Can add messages', function(assert) {
    messages.push(testMessage2.status, testMessage2.body);
    assert.equal(messages.get().length, 2);
    assert.equal(messages.get()[1], testMessage2);
});

QUnit.test('Can remove messages', function(assert) {
    messages.remove(testMessage1);
    assert.equal(messages.get().length, 0);
});

QUnit.test('Can clear multiple messages', function(assert) {
    messages.push(testMessage2.status, testMessage2.body);
    assert.equal(messages.get().length, 2);
    messages.clear();
    assert.equal(messages.get().length, 0);
});
