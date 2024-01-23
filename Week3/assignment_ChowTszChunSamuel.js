// YOU have to use a HOF.

// 1. Write a function that takes a string parameter, and it console "YES" if the string,
// contains 'y' other wise it console "NO".
// Example - 'Crazyy'
function funcIsContainY(szInput)
{
    arrInputChar = szInput.split(""); 
    return arrInputChar.findIndex(char => char === 'y') >= 0 ? "YES" : "NO";
}

console.log(funcIsContainY("Crazyy"));  // YES
console.log(funcIsContainY("Craz"));    // NO


// 2. Write a function that finds a factorial of a number.
// Example - 5! = 120 (Use a normal loop for this one.)

// By For Loop
function funcFactorial(num)
{
    returnNum = 1;
    for (let i = num; i > 0; i--)
    {
        returnNum *= i;
    }
    return returnNum;
}
console.log(funcFactorial(5));

// By Recursion
function funcFactorialRecursion(num)
{
    return (num === 1 || num === 0) ? 1 : num * funcFactorialRecursion(num - 1);
}
console.log(funcFactorial(4));



//3. You have an array of students
let studentList = [
  { name: "Mike", marks: [80, 50, 60, 100] },
  { name: "Daniel", marks: [40, 50, 100, 100] },
  {
    name: "Stacy",
    marks: [20, 100, 50, 70],
  },
];

function getHighestAverageStudent(listOfStudentObj) {

    let objHighestMark = {};

    listOfStudentObj.forEach((element) =>{
        average = element.marks.reduce((accumulator, value)=>{
            return accumulator + value;
        }, 0) / element.marks.length;

        if (Object.keys(objHighestMark).length === 0 ||
            objHighestMark.avarage < average)
        {
            studentName = element.name;
            objHighestMark = {studentName, average};
        }
    });
    return `Hightest Average Mark Student : ${objHighestMark.studentName} ; Average Mark : ${objHighestMark.average}`;
}
console.log(getHighestAverageStudent(studentList));



//4. HARD Question - You have to write a function that has the highest number of occurrences
const listNum1 = [20, 4, -10, 4, 11, 20, 4, 2]; // 4

function CountOcurrence(listOfNum)
{
    let objOccurCount = {};
    listOfNum.forEach((num)=>{
        if (num in objOccurCount)
        {
            objOccurCount[num] += 1;
        }
        else
        {
            objOccurCount[num] = 1;
        }
    });
    return objOccurCount;
}

function HighestOccurrence(listOfNum)
{
    // [0 - Num, 1 - Occurrence]
    listOfOccurNum = Object.entries(CountOcurrence(listOfNum));

    return listOfOccurNum.reduce((accumulator, obj)=>{
                                const [curHighOccurNum, curHighOccurCount] = accumulator;
                                const [num, occurCount] = obj;
                                return occurCount > curHighOccurCount ? obj : accumulator;
                            }, listOfOccurNum[0])[0];
} 
console.log(HighestOccurrence(listNum1));



//5. You have to write a function that has to find a number which is unique in the array (I.e Only occured once)
const listNum2 = [20, 20, 11, 4, 11, 20, 2, 4];

function GetUniqueNumber(listOfNum)
{
    // [0 - Num, 1 - Occurrence]
    listOfOccurNum = Object.entries(CountOcurrence(listOfNum));

    // Filter return is a array of an array of the unique num, [0][0] return the Unique Number
    return (listOfOccurNum.filter((numOccur) => numOccur[1] === 1))[0][0];
}
console.log(GetUniqueNumber(listNum2));


//6. You have an arryay of palindromes and not palindromes,  and you have to return only palindromes array

const listString1 = ['abc', 'aba', 'ccc', 'dca', 'a'];
// ['aba', 'ccc', 'a']

const listString2 = ["apple",
"banana",
"level", // (palindrome)
"grape",
"radar", // (palindrome)
"kiwi",
"civic", // (palindrome)
"orange",
"deified", // (palindrome)
"mango"];

function GetPalindromeString(listOfString)
{
    listOfPalindStr = listOfString.filter((strElement)=>{
                                            isPalindrome = true;
                                            listOfChar = strElement.split("");
                                            
                                            listOfChar.forEach((character, index)=>{
                                                isPalindrome &= (character === listOfChar[listOfChar.length - index - 1]);
                                            });
                                            return isPalindrome;
                                        });
    return listOfPalindStr;
}
console.log(GetPalindromeString(listString1).join(", "));
console.log(GetPalindromeString(listString2).join(", "));