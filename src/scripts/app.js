/** @jsx React.DOM */
"use strict";

var React = require('react'),
    configMixin = require('./config-mixin.js');

var App = React.createClass({
    mixins: [configMixin],

    render: function () {
        var baseUrl = this.config.apiBaseUrl;
        return (<div>{baseUrl}</div>)
    }
});

React.renderComponent(<App />, document.getElementById('app-container'));
