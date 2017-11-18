/**
 * A simple message bus. Facilitates uncoupled communication between
 * components of fieldplay.
 */
var eventify = require('ngraph.events');

module.exports = eventify({});