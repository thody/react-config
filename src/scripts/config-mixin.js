"use strict";

module.exports = {
    componentWillMount: function () {
        this.config = {};

        if (ENV === 'production') {
            var config = this.config;

            $.get("http://configapi.example.com/widget-configs/1234", function (result) {
                config = result[0];
            });
        } else if (ENV === 'staging') {
            this.config.apiBaseUrl = "http://staging.api.example.com";
        } else {
            this.config.apiBaseUrl = "http://dev.api.example.com";
        }
    }    
};