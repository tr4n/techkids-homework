'use strict'
var ObjectGenerator = {
  NOT_FOUND: -1,
  FIRST_INDEX: 1,
  LAST_INDEX: 2,
  MIDDLE_INDEX: 3,
  MAX_VALUE: 1 << 10,

  generateSortedArray(length, maxValue) {
      var array = [];
      var value = -maxValue;
      var delta = parseInt((maxValue << 1) / length);
      while (length--) {
          value += parseInt(delta * Math.random() + 1);
          array.push(value);
      }

      return array;

  },

  generateMode() {
      var rand = Math.random() * 10;
      return rand < 1 ? this.NOT_FOUND : rand < 8 ? this.FIRST_INDEX : rand < 9 ? this.LAST_INDEX : this.MIDDLE_INDEX;
  },

  generateObject(length, mode) {
      var input = this.generateSortedArray(length, this.MAX_VALUE);
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
              generatedArray.push(this.generateSortedArray(element, this.generateMode()));
          });

      }
      return generatedArray;
  }

};

function generate(testLengthArray){
  return ObjectGenerator.generateObjectArray(testLengthArray);
}

module.exports = generate
