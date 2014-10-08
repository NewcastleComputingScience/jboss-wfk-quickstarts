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
contacts
    .controller('HomeCtrl', ['$scope', '$filter', 'Contacts', 'Messages',
        function($scope, $filter, Contacts, Messages) {
        //Assign contacts service to $scope variable
        $scope.contacts = Contacts;
        //Assign messages service to $scope variable
        $scope.messages = Messages;

        //Divide contact list into several sub lists according to the first character of their firstName property
        var getHeadings = function(contacts) {
            var headings = {};
            for(var i = 0; i<contacts.length; i++) {
                //Get the first letter of a contact's firstName
                var startsWithLetter = contacts[i].firstName.charAt(0).toUpperCase();
                //If we have encountered that first letter before then add the contact to that list, else create it
                if(headings.hasOwnProperty(startsWithLetter)) {
                    headings[startsWithLetter].push(contacts[i]);
                } else {
                    headings[startsWithLetter] = [contacts[i]];
                }
            }
            return headings;
        };

        //Upon initial loading of the controller, populate a list of Contacts and their letter headings
       $scope.contacts.data = $scope.contacts.query(
            //Successful query
            function(data) {
                $scope.contacts.data = data;
                $scope.contactsList = getHeadings($scope.contacts.data);
                //Keep the contacts list headings in sync with the underlying contacts
                $scope.$watchCollection('contacts.data', function(newContacts, oldContacts) {
                    $scope.contactsList = getHeadings(newContacts);
                });
            },
            //Error
            function(result) {
                for(var error in result.data){
                    $scope.messages.push('danger', result.data[error]);
                }
            }
        );

        //Boolean flag representing whether the details of the contacts are expanded inline
        $scope.details = false;

        //Default search string
        $scope.search = "";

        //Continuously filter the content of the contacts list according to the contents of $scope.search
        $scope.$watch('search', function(newValue, oldValue) {
            $scope.contactsList = getHeadings($filter('filter')($scope.contacts.data, $scope.search));
        });
    }])
    .controller('ContactCtrl', ['$scope', '$routeParams', '$location', 'Contacts', 'Messages',
        function ($scope, $routeParams, $location, Contacts, Messages) {
        //Assign contacts service to $scope variable
        $scope.contacts = Contacts;
        //Assign messages service to $scope variable
        $scope.messages = Messages;

        //Get today's date for the birthDate form value max
        $scope.date = Date.now();

        //Get the contact with the id :contactId if set.
        $scope.contact = ($routeParams.hasOwnProperty('contactId'))?$scope.contacts.get({contactId: $routeParams.contactId}):{};

        // Define a reset function, that clears the prototype new Contact object, and
        // consequently, the form
        $scope.reset = function() {
            // Sets the form to it's pristine state
            if($scope.contactForm) {
                $scope.contactForm.$setPristine();
            }

            // Clear input fields. If $scope.contact was set to an empty object {},
            // then invalid form values would not be reset.
            // By specifying all properties, input fields with invalid values are also reset.
            $scope.contact = {firstName: "", lastName: "", phoneNumber: "", email: "", birthDate: ""};

            // clear messages
            $scope.messages.clear();
        };

        // Define an addContact() function, which creates a new contact via the REST service,
        // using those details provided and displaying any error messages
        $scope.addContact = function() {
            $scope.messages.clear();

            $scope.contacts.save($scope.contact,
                //Successful query
                function(data) {

                    // Update the list of contacts
                    $scope.contacts.data.push(data);

                    // Clear the form
                    $scope.reset();

                    //Add success message
                    $scope.messages.push('success', 'Contact added');
                //Error
                }, function(result) {
                    for(var error in result.data){
                        $scope.messages.push('danger', result.data[error]);
                    }
                }
            );

        };

        // Define a saveContact() function, which saves the current contact using the REST service
        // and displays any error messages
        $scope.saveContact = function() {
            $scope.messages.clear();

            $scope.contact.$update(
                //Successful query
                function(data) {
                    //Add success message
                    $scope.messages.push('success', 'Contact saved');
                //Error
                }, function(result) {
                    for(var error in result.data){
                        $scope.messages.push('danger', result.data[error]);
                    }
                }
            )
        };

        // Define a deleteContact() function, which saves the current contact using the REST service
        // and displays any error messages
        $scope.deleteContact = function() {
            $scope.messages.clear();

            //Send the DELETE request
            $scope.contact.$delete({contactId: $scope.contact.id},
                //Successful query
                function() {
                    //Find the contact locally and remove it
                    var idx = $scope.contacts.data.indexOf($scope.contact);
                    $scope.contacts.data.splice(idx, 1);
                    //Mark success on the editContact form
                    $scope.messages.push('success', 'Contact removed');
                    //Redirect back to /home
                    $location.path('/home');
                //Error
                }, function(result) {
                    for(var error in result.data){
                        $scope.messages.push('danger', result.data[error]);
                    }
                }
            );

        };
    }]);
