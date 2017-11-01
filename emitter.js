'use strict';

getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let events = {};

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!(event in events)) {
                events[event] = [];
            }
            events[event].push({
                context,
                handler
            });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            for (let element in events) {
                if (element.startsWith(event + '.') || element === event) {
                    events[element] = events[element]
                        .filter(item => item.context !== context);
                }
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let elements = event.split('.');
            while (elements.length) {
                let newEvent = elements.join('.');
                if (newEvent in events) {
                    events[newEvent]
                        .forEach(item => item.handler.call(item.context));
                }
                elements.pop();
            }

            return this;
        }
    };
}

