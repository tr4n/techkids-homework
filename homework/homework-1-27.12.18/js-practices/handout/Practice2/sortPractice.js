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
    var length = input.length;
    if (length < 2)
        return input;
    var mid = Math.floor(length >> 1),
        firstArray = input.slice(0, mid),
        secondArray = input.slice(mid);
    return merge(mergeSort(firstArray), mergeSort(secondArray));
}

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
    return result.concat(firstArray.slice(left)).concat(secondArray.slice(right));
}

function sort(input) {
    return mergeSort(input);
}

module.exports = sort