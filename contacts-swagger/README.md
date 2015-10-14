contacts-swagger: Documented CRUD REST API example, Swagger and JAX-RS
======================================================================
Author: Hugo Firth
Level: Beginner  
Technologies: Swagger, REST  
Summary: The `contacts-swagger` quickstart demonstrates a Java EE 6 mobile database REST service using Swagger, JAX-RS, 
JPA 2.0, and REST.  
Target Product: WFK  
Product Versions: EAP 6.3, WFK 2.7  
Source: <https://github.com/jboss-developer/jboss-wfk-quickstarts>  

What is it?
-----------

The `contact-swagger` quickstart is a deployable Maven 3 project designed to help you get your foot in the door 
developing REST APIs with Java EE 6 in Red Hat JBoss Enterprise Application Platform. This project is setup to allow 
you to create a basic Java EE 6 service using Swagger, JAX-RS, CDI 1.0, EJB 3.1, JPA 2.0, Bean Validation 1.0 and 
JUnit. It includes a persistence unit and some sample persistence and transaction code to help you get your feet wet with 
database access in enterprise Java.

This service is built using a RESTful approach; i.e. clients should interacts with with the application server via 
restful end-points (declared using JAX-RS). This application also provides vital unit tests for the contacts service. 
As documentation is so important when designing APIs for use by others, we include the necessary annotations to 
generate example interactive documentation using the popular [Swagger](http://swagger.io) tool.

This application focuses on **CRUD** operations against a single resource (mobile contacts). The user will have the 
ability to:

* **Create** a new contact.

* **Read** a list of contacts.

* **Update** an existing contact.

* **Delete** a contact.

_Note: This quickstart uses the Jackson libraries, which are not supported for development or production use in JBoss EAP. 
For more information, see [JBoss Enterprise Application Platform Component Details](https://access.redhat.com/articles/112673) 
and [Does JBoss EAP support the use of Jackson libraries?](https://access.redhat.com/articles/1265083)._


System requirements
-------------------

The application this project produces is designed to be run on Red Hat JBoss Enterprise Application Platform (JBoss EAP) 
6.3 or later with the Red Hat JBoss Web Framework Kit (WFK) 2.7.

All you need to build this project is Java 7.0 (Java SDK 1.7) or later, and Maven 3.0 or later.

An HTML5 compatible browser such as Chrome, Safari 5+, Firefox 5+, or IE 9+ is required to view the Swagger 
documentation.
 
With the prerequisites out of the way, you're ready to build and deploy.


Configure Maven
---------------

If you have not yet done so, you must [Configure Maven](https://github.com/jboss-developer/jboss-developer-shared-resources/blob/master/guides/CONFIGURE_MAVEN.md#configure-maven-to-build-and-deploy-the-quickstarts) before testing the quickstarts.


Start the JBoss EAP Server
-----------------------

1. Open a command line and navigate to the root of the JBoss EAP directory.
2. The following shows the command line to start the server with the default profile:

        For Linux:   EAP_HOME/bin/standalone.sh
        For Windows: EAP_HOME\bin\standalone.bat

   Note: Adding "-b 0.0.0.0" to the above commands will allow external clients (phones, tablets, desktops, etc...) 
   connect through your local network.

   For example

        For Linux:   EAP_HOME/bin/standalone.sh -b 0.0.0.0
        For Windows: EAP_HOME\bin\standalone.bat -b 0.0.0.0


Build and Deploy the Quickstart
-------------------------------

1. Make sure you have started the JBoss EAP server as described above.
2. Open a command line and navigate to the root directory of this quickstart.
3. Type this command to build and deploy the archive:

        mvn clean package jboss-as:deploy

4. This deploys `target/jboss-contacts-swagger.war` to the running instance of the server.


Access the application
----------------------

Access the API endpoints under the following base URL: <http://localhost:8080/jboss-contacts-swagger/api/*>.
Access the documentation of the APIs endpoints in a browser at the top-level URL: <http://localhost:8080/jboss-contacts-swagger/>.


Undeploy the Archive
--------------------

1. Make sure you have started the JBoss EAP server as described above.
2. Open a command line and navigate to the root directory of this quickstart.
3. When you are finished testing, type this command to undeploy the archive:

        mvn jboss-as:undeploy
        


Run the Quickstart in Red Hat JBoss Developer Studio or Eclipse
-------------------------------------
You can also start the server and deploy the quickstarts from Eclipse using JBoss tools. 
For more information, see [Use JBoss Developer Studio or Eclipse to Run the Quickstarts](https://github.com/jboss-developer/jboss-developer-shared-resources/blob/master/guides/USE_JBDS.md#use-jboss-developer-studio-or-eclipse-to-run-the-quickstarts) 


### Deploying to OpenShift

You can also deploy the application directly to OpenShift, Red Hat's cloud based PaaS offering, follow the 
instructions [here](https://community.jboss.org/wiki/DeployingHTML5ApplicationsToOpenshift)


Run the Arquillian tests
============================

By default, tests are configured to be skipped. The reason is that the sample test is an Arquillian test, which requires 
the use of a container. You can activate this test by selecting one of the container configuration provided  for JBoss.

To run the test in JBoss, first start the container instance. Then, run the test goal with the following profile activated:

    mvn clean test -Parq-jbossas-remote


Import the Project into an IDE
=================================

If you created the project using the Maven archetype wizard in your IDE (Eclipse, NetBeans or IntelliJ IDEA), then there 
is nothing to do. You should already have an IDE project.

If you created the project from the command line using archetype:generate, then you need to import the project into your IDE. 
If you are using NetBeans 6.8 or IntelliJ IDEA 9, then all you have to do is open the project as an existing project. 
Both of these IDEs recognize Maven projects natively.


Debug the Application
=============================

If you want to be able to debug into the source code or look at the Javadocs of any library in the project, you can run 
either of the following two commands to pull them into your local repository. The IDE should then detect them.

    mvn dependency:sources
    mvn dependency:resolve -Dclassifier=javadoc
