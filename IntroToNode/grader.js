function average (grades){
    var sum = 0;
    grades.forEach(function (grade){
        sum += grade;
    })
    var avg = Math.round((sum / grades.length));
    return avg;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));