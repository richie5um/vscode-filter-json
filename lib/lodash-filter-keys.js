var _ = require('lodash');

_.mixin({
    'filterKeysDeepBy': function (obj, options) {
        var keys = _.keys(obj);

        if (options.excludeKeys && 0 < options.excludeKeys.length) {
            keys = _.difference(keys, options.excludeKeys);
        }

        if (options.includeKeys && 0 < options.includeKeys.length) {
            keys = _.intersection(keys, options.includeKeys);
        }

        return _.zipObject(keys, _.map(keys, function (key) {
            if (!_.isNumber(obj[key]) && !_.isFunction(obj[key]) && !_.isArray(obj[key]) && _.isObject(obj[key])) {
                obj[key] = _.filterKeysDeepBy(obj[key], options);
            }
            return obj[key];
        }));
    }
});