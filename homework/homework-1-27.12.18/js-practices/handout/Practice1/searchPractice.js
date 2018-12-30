'use strict'




function search(input, target) {
    function binarySearch(sortedArray, firstIndex, secondIndex, value) {
        var left = firstIndex,
            right = secondIndex;
        while (left <= right) {
            var mid = (left + right) >> 1;
            if (sortedArray[mid] == value)
                return mid;
            if (value < sortedArray[mid])
                right = mid - 1;
            else
                left = mid + 1;

        }
        return -1;
    };
    return binarySearch(input, 0, input.length - 1, target);
}

module.exports = search