# Introduction
The goal of Fakepay is to provaide a tool to return configured responses to act as a development replacement for a Payment Gateway.

# The Application
Fakepay itself is a simple node based command line application which executes a web server which can be used as a developer endpoint, in lieu of an actual payment gateway. You can execute it with parameters to indicate what payment gateway module to use and what kind of response it will return.

# Modules
Fakepay is a fully modular system. The application itself provides the web server implementation and CLI but the modules provide the logic and mappings to determine what responses shold be returned. The idea is that, should fakepay not cover your needs, that you can simply clone one of the existing modules and write a module for your payment gateway of choice and, hopefully, contribute to this project.