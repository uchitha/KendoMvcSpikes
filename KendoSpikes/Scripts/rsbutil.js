/* File Created: August 27, 2014 */

window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console && !this.disable_logging) {
        console.log(Array.prototype.slice.call(arguments));
    }
}