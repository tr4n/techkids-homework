'use strict'


var Sort = {
    mergeSort(input) {
        var length = input.length;
        if (length < 2)
            return input;
        var mid = Math.floor(length >> 1),
            firstArray = input.slice(0, mid),
            secondArray = input.slice(mid);
        return merge(mergeSort(firstArray), mergeSort(secondArray));
    },

    merge(firstArray, secondArray) {
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
}



var ObjectGenerator = {
    NOT_FOUND: -1,
    FIRST_INDEX: 1,
    LAST_INDEX: 2,
    MIDDLE_INDEX: 3,
    MAX_VALUE: 10000,

    createArray(length, maxValue) {
        var array = [];
        var value = -maxValue;
        var delta = parseInt((maxValue << 1) / length);
        while (length-- > 0) {
            value += parseInt(delta * Math.random() + 1);
            array.push(value);
        }
        return array;

    },

    generateMode() {
        var rand = Math.random() * 10;
        return rand < 1 ? this.NOT_FOUND : rand < 3 ? this.FIRST_INDEX : rand < 5 ? this.LAST_INDEX : this.MIDDLE_INDEX;
    },

    generateObject(length, mode) {
        var input = this.createArray(length, this.MAX_VALUE);
        var target = this.MAX_VALUE,
            output = this.NOT_FOUND;

        switch (mode) {
            case this.NOT_FOUND:
                target = this.MAX_VALUE + parseInt(Math.random() * 10 + 2);
                output = this.NOT_FOUND;
                break;
            case this.FIRST_INDEX:
                target = input[0];
                output = 0;
                //  output = input.indexOf(target);
                break;
            case this.LAST_INDEX:
                output = length - 1;
                target = input[length - 1];
                //   output = input.indexOf(target);
                break;
            case this.MIDDLE_INDEX:
                output = length > 2 ? 1 + parseInt(Math.random() * (length - 2)) : 0;
                target = input[output];
                //   output = input.indexOf(target);
                break;
        }
        return {
            "input": input,
            "target": target,
            "output": output
        }
    },
    generateObjectArray(testLengthArray) {
        var generatedArray = [];

        if (testLengthArray.length > 3) {
            generatedArray.push(this.generateObject(testLengthArray[0], this.NOT_FOUND));
            generatedArray.push(this.generateObject(testLengthArray[1], this.FIRST_INDEX));
            generatedArray.push(this.generateObject(testLengthArray[2], this.LAST_INDEX));
            generatedArray.push(this.generateObject(testLengthArray[3], this.MIDDLE_INDEX));

            for (var index = 4; index < testLengthArray.length; index++) {
                generatedArray.push(this.generateObject(testLengthArray[index], this.generateMode()));
            }

        } else {
            testLengthArray.forEach(element => {
                generatedArray.push(this.createArray(element, this.generateMode()));
            });

        }
        return generatedArray;
    }

}

function generate(testLengthArray) {

    return ObjectGenerator.generateObjectArray(testLengthArray);
}

module.exports = generate