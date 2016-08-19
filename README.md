* Register component.
```
Vue.component('feedback', require('@jennyswift/feedback'));
```

* Add template such as:
```
<template id="feedback-template">
    <div id="feedback">
        <div
            v-for="feedback in feedbackMessages" track-by="$index"
            :class="feedback.type"
            class="feedback-message"
        >

            <ul>
                <li v-for="message in feedback.messages">
                    @{{ message }}
                </li>
            </ul>
        </div>
    </div>
</template>
```

* Add styling

* To use:
```
$.event.trigger('provide-feedback', [feedbackMessage, 'success']);
```