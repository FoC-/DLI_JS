DI = new function () {
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_ARG_SPLIT = /,/;
    var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var self = this;
    var dependencies = {};

    this.set = function (name, dependency) {
        dependencies[name] = dependency;
        return self;
    };
    this.run = function (o) {
        var names = [],
            target;

        if (typeof o == 'function') {
            var text = o.toString().replace(STRIP_COMMENTS, '');
            var args = text.match(FN_ARGS)[1].split(FN_ARG_SPLIT);
            names = args.map(function (value) {
                return value.replace(FN_ARG, function (match, offset, name) { return name; });
            });
            target = o;
        } else if (o instanceof Array) {
            var last = o.length - 1;
            names = o.slice(0, last);
            target = o[last];
        }

        var deps = names.map(function (value) {
            return dependencies[value];
        });

        target.apply(target, deps);
    };
};
