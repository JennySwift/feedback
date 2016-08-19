1. Register component.
```
Vue.component('feedback', require('@jennyswift/feedback'));
```

2. Add template such as:
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

3. Add styling

4. To use:
```
$.event.trigger('provide-feedback', [feedbackMessage, 'success']);
```