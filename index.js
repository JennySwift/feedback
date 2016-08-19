var _ = require('underscore');
var $ = require('jquery');

module.exports = {
    template: "#feedback-template",
    data: function () {
        return {
            feedbackMessages: []
        };
    },
    methods: {

        /**
         *
         * @param messages
         * @param type
         */
        provideFeedback: function (messages, type) {
            if (typeof messages === 'string') {
                messages = [messages];
            }

            var feedback = {
                messages: messages,
                type: type
            };

            var that = this;

            this.feedbackMessages.push(feedback);

            setTimeout(function () {
                that.feedbackMessages = _.without(that.feedbackMessages, feedback);
            }, 4000);
        },

        /**
         *
         * @param data
         * @param status
         * @returns {*}
         */
        handleResponseError: function (data, status, response) {
            var messages = [];
            var defaultMessage = 'There was an error';

            if (!status && data && data.status) {
                status = data.status;
            }

            switch(status) {
                case 503:
                    messages.push('Sorry, application under construction. Please try again later.');
                    break;
                case 401:
                    messages.push('You are not logged in');
                    break;
                case 422:
                    messages = this.setMessagesFrom422Status(data);
                    break;
                default:
                    data && data.error ? messages.push(data.error) : messages.push(defaultMessage);
                    break;
            }

            if (messages.length < 1) {
                messages.push(defaultMessage);
            }

            return messages;
        },

        /**
         *
         * @returns {string}
         */
        setMessagesFrom422Status: function (data) {
            var messages = [];

            for (errors in data) {
                for (var i = 0; i < data[errors].length; i++) {
                    messages.push(data[errors][i]);
                }
            }

            return messages;
        },

        /**
         *
         */
        listen: function () {
            var that = this;
            $(document).on('provide-feedback', function (event, messages, type) {
                that.provideFeedback(messages, type);
            });
            $(document).on('response-error', function (event, data, status, response) {
                that.provideFeedback(that.handleResponseError(data, status, response), 'error');
            });
        },
    },
    ready: function () {
        this.listen();
    },
};