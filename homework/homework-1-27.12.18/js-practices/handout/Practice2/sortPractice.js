'use strict'

function bubbleSort(input) {
    var len = input.length;
    for (var i = len - 1; i >= 0; i--) {
        for (var j = 1; j <= i; j++) {
            if (input[j - 1] > input[j]) {
                var temp = input[j - 1];
                input[j - 1] = input[j];
                input[j] = temp;
            }
        }
    }
    return input;
}

function mergeSort(input) {
    function merge(firstArray, secondArray) {
        var result = [],
            firstLength = firstArray.length,
            secondLength = secondArray.length,
            left = 0,
            right = 0;
        while (left < firstLength && right < secondLength) {
            if (firstArray[left] < secondArray[right]) {
                result.push(firstArray[left++]);
            } else {
                result.push(secondArray[right++]);
            }
        }
        return result.concat(firstArray.slice(left)).concat(secondArray.slice(right))
    };
    var length = input.length;
    if (length < 2)
        return input;
    var mid = Math.floor(length >> 1),
        firstArray = input.slice(0, mid),
        secondArray = input.slice(mid);
    return merge(mergeSort(firstArray), mergeSort(secondArray));
}

function radixSort(array) {
    function sort(nth) {
        var i, j, k;
        var nextRadix = false;
        const currentPlaceValue = 10 ** nth;
        const nextPlaceValue = 10 ** (nth + 1);
        const buckets = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        i = 0;
        for (j = 0; j < array.length; j++) {
            var val = array[j];
            var uVal = Math.abs(val)
            if (uVal >= nextPlaceValue) { nextRadix = true }
            const digit = Math.floor(uVal / currentPlaceValue) % 10;
            if (val >= 0) { buckets[digit + 10].push(val) } else { buckets[10 - digit].push(val) }
        }
        for (j = 0; j < buckets.length; j++) {
            const bucket = buckets[j];
            for (k = 0; k < bucket.length; k++) { array[i++] = bucket[k] }
        }
        return nextRadix;
    }
    var radix = 0;
    if (array.length > 1) {
        while (sort(radix++));
    }
    return array;
};

function sort(input) {

    return radixSort(input);
    // return input.sort((a, b) => (a - b));
}

module.exports = sort