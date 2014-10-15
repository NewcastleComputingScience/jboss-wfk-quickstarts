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
//Angular services may injected throughout a codebase and provide access to shared data and functionality
angular.module('contactsServices', ['ngResource']).
    //Defines the Contacts REST resource, allowing us to interact with it as an Angular.js service elsewhere in the code
    factory('Contacts',['$resource', function($resource) {
        //Instantiate the Contacts resource for interacting with the /contacts/ endpoint
        var contacts = $resource('rest/contacts/:contactId', {contactId: '@id'}, {'update': {method: 'PUT'}});
        //Extend the $resource to share contacts data locally across controllers
        contacts.data = {};
        return contacts;
    }]).
    //Defines the Messages service, used to share simple objects ({status:'', body:''}) throughout the code
    factory('Messages', [function() {
        //Create the messages array
        var messages = [];

        //Clear the messages array
        var clear = function() {
            messages = [];
        };

        //Add to the messages array
        var push = function(status, body) {
            messages.push({
                status: status,
                body: body
            });
        };

        //Remove a specific message from the messages array
        var remove = function(message) {
            //Get the index of the message to be removed
            var idx = messages.indexOf(message);
            messages.splice(idx, 1);
        };

        //Get the messages array
        var get = function() {
            return messages;
        };

        //Expose the Messages API
        return {
            clear: clear,
            push: push,
            remove: remove,
            get: get
        }
    }]);