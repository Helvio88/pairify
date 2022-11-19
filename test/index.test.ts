import { expect } from 'chai';
import { Calculator } from '../src/index';

describe('The string calculator', () => {
    const calculator = new Calculator();

    // 1. Given the user input is empty when calculating the sum then it should return zero.
    describe("when summing with no input", () => {
        it('should return a zero', () => {
            expect(calculator.sum()).to.equal(0);            
        });        
    })
    // 2. Given the user input is one number when calculating the sum then it should return the same number. (example "3" should equal 3)
    describe("when a single number is input", () => {
        it("should return the same number", () => {
            expect(calculator.sum('3')).to.equal(3);
        })
    })

    // 3. Given the user input is two numbers when calculating the sum then it should return the sum of those numbers. (example "1,2" should equal 3)
    describe("when summing with two numbers", () => {
        it("should return the sum of both numbers", () => {
            expect(calculator.sum("2,3")).to.equal(5);
        })
    })

    // 4. Given the user input is an unknown amount of numbers when calculating the sum then it should return the sum of all the numbers. (example "1,2,3" should equal 6)
    describe("when summing 0..n numbers", () => {
        it("should return the sum of all numbers", () => {
            expect(calculator.sum("1,2,3")).to.equal(6);
        })
    })

    // 5. Given the user input is multiple numbers with new line and comma delimiters when calculating the sum then it should return the sum of all the numbers. (example "1\n2,3" should equal 6)
    describe("when summing with comma and new line delimiters", () => {
        it("should return the sum of the numbers", () => {
            expect(calculator.sum("1,2\n4\n5")).to.equal(12);
        })
    })

    // 6. Given the user input is multiple numbers with a custom single-character delimiter when calculating the sum then it should return the sum of all the numbers. (example “//;\n1;2” should return 3)
    describe("when input a custom single-character delimiter", () => {
        it("should use it to separate the numbers and return the sum of them", () => {
            expect(calculator.sum('//;\n1;2')).to.equal(3);
        })
    })
    
    // 7. Given the user input contains one negative number when calculating the sum then it should throw an exception "negatives not allowed: x" (where x is the negative number).
    describe("when attempting to sum with a negative number", () => {
        it("should throw an exception with the correct message", () => {
            expect(() => calculator.sum("1,-3,4")).to.throw(`negatives not allowed: -3`);
        })
    })

    // 8. Given the user input contains multiple negative numbers mixed with positive numbers when calculating the sum then it should throw an exception "negatives not allowed: x, y, z" (where x, y, z are only the negative numbers).
    describe("when attempting to sum with multiple negative numbers", () => {
        it("should throw an exception with the correct message", () => {
            expect(() => calculator.sum("1,-2,3,-4,5,-6")).to.throw(`negatives not allowed: -2, -4, -6`);
        })
    })

    // 9. Given the user input contains numbers larger than 1000 when calculating the sum it should only sum the numbers less than 1001. (example 2 + 1001 = 2)
    describe("when attempting to sum with numbers larger than 1000", () => {
        it("should only sum numbers smaller than 1001", () => {
            expect(calculator.sum("1001,2")).to.equal(2);
        })
    })

    // NOTE: I am not sure that 1**_2_**3 was intended, so I assumed it was meant to be 1***2***3
    // 10. Given the user input is multiple numbers with a custom multi-character delimiter when calculating the sum then it should return the sum of all the numbers. (example: “//[***]\n1**_2_**3” should return 6)
    describe("when attempting to sum multiple numbers with a multi-char delimiter", () => {
        it("should return the sum of all numbers", () => {
            expect(calculator.sum("//[***]\n1***2***3")).to.equal(6);
        })
    })

    //11. Given the user input is multiple numbers with multiple custom delimiters when calculating the sum then it should return the sum of all the numbers. (example “//[\*][%]\n1\*2%3” should return 6)
    describe("when attempting to sum multiple numbers with multiple delimiters", () => {
        it("should return the sum of all numbers", () => {
            expect(calculator.sum("//[\*][%]\n1\*2%3")).to.equal(6);
        })
    })
});
