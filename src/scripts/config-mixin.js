"use strict";

/**
    One possible approach to "config injection" essentially, that will populate
    a config object on base classes prior to the React mount phase.

    Pros:
    - hides config retrieval details from base classes
    - doesn't pollute component signatures by passing props down
    - only requires base classes that need config to know about config

    Cons:
    - setting/reading of ENV var feels sloppy
    - requires knowledge of all ENV permutations (not easily overridable at build/runtime)
*/
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