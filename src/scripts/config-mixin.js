"use strict";

module.exports = {

    // Sets config object on target prior to mounting
    componentWillMount: function () {
        this.config = {};

        if (ENV === 'production') {
            // in this case, grab configuration from a config management API
            var config = this.config;

            $.get("http://configapi.example.com/widget-configs/1234", function (result) {
                config = result[0];
            });
        } else {
            // in this case, use static configuration values
            this.config.apiBaseUrl = "http://dev.api.example.com";
        }
    }    
};