AEM = new function () {
    var listeners = {};
    this.sub = function (name, func) {
        listeners[name] = listeners[name] || [];
        listeners[name][listeners[name].length] = func;
    };
    this.pub = function (e) {
        var cbs = listeners[e.name];
        if (cbs) {
            for (var j = 0; j < cbs.length; j++) {
                (function (f) {
                    setTimeout(function () {
                        f(e.msg, e);
                    }, 0);
                })(cbs[j]);
            }
        }
    }
};
