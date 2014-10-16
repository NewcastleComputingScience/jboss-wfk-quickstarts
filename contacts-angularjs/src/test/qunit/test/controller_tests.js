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
 * Unit tests that cover the basic functionality of controllers.js
 */

var injector = angular.injector(['ng', 'ngMock', 'contacts', 'contactsServices']);
var messages = injector.get('Messages');
var contacts = injector.get('Contacts');
var $controller = injector.get('$controller');
var $filter = injector.get('$filter');
var $httpBackend = injector.get('$httpBackend');

var initHomeCtrl = {
    setup: function() {
        this.$scope = injector.get('$rootScope').$new();
        this.testContacts = [
            {"id":10002,"firstName":"Davey","lastName":"Jones","email":"davey.jones@locker.com",
                "phoneNumber":"(212)555-3333","birthDate":"1996-08-07"},
            {"id":10001,"firstName":"John","lastName":"Smith","email":"john.smith@mailinator.com",
                "phoneNumber":"(212) 555-1212","birthDate":"1963-06-03"}
        ];
        $httpBackend.expectGET('/contacts').respond(200, this.testContacts);
        $controller('HomeCtrl', {
            $scope: this.$scope,
            $filter: $filter,
            Contacts: contacts,
            Messages: messages
        });
    }
};

QUnit.module('controller_tests for HomeCtrl', initHomeCtrl);

QUnit.test('"HomeCtrl" initialised successfully', function(assert) {
    assert.equal(this.$scope.contacts.data, this.testContacts, "The contacts data is requested upon HomeCtrl init.");
});

QUnit.test('"HomeCtrl" dynamically generates contact list heads correctly', function(assert) {
    assert.equal(this.$scope.contactsList, ['D', 'J']);
});

QUnit.test('"HomeCtrl" search filter works correctly', function(assert) {
    this.$scope.search = "D";
    assert.equal(this.$scope.contactsList.length, 1);
    assert.equal(this.$scope.contactsList[0], this.testContacts[0]);
});