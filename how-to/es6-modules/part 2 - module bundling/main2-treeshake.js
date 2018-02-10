function each(collection, iterator) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            iterator(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            iterator(collection[key], key, collection);
        }
    }
};

function filter(collection, test) {
    var filtered = [];
    each(collection, function (item) {
        if (test(item)) {
            filtered.push(item);
        }
    });
    return filtered;
};

filter([1, 2, 3], function (x) {
    return x === 2
});