'use strict'
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

function search(input, target) {
  return  binarySearch(input, 0, input.length -1 , target); // Remove this line and change to your own algorithm
}

module.exports = search
