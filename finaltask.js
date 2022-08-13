console.log(calcBalls([100, 300, 200], 120))            //mustBeAnsw : [20, 60, 40]
console.log(calcBalls([1, 2, 1, 1], 1))                 //mustBeAnsw : [ 0, 1, 0, 0]
console.log(calcBalls([10, 10, 10], 100))               //mustBeAnsw : [ 10, 10, 10]
console.log(calcBalls([1, 1, 2, 1], 2))                 //mustBeAnsw : [ 1, 0, 1, 0 ]
console.log(calcBalls([100, 300, 200], 3))              //mustBeAnsw : [ 0, 2, 1 ]
console.log(calcBalls([100, 300, 200, 700, 140], 0))    //mustBeAnsw : 0
console.log(calcBalls(0, 25))                           //mustBeAnsw : 0
console.log(calcBalls([1, 1, 7], 3))                    //mustBeAnsw : [ 0, 0, 3 ]
console.log(calcBalls([1, 1, 4], 3))                    //mustBeAnsw : [ 1, 0, 2 ]


function calcBalls(arrBalls, maxWeight) {
    // проверка на нули в условии
    if (chekZero(arrBalls, maxWeight)) {
        return 0
    }

    const ballsSum = arrBalls.reduce((acc, item) => {
        acc += item
        return acc
    }, 0)

    const ballsProcent = arrBalls.reduce((acc, item) => {
        acc.push(item * 100 / ballsSum)
        return acc
    }, [])

    // что бы не положить больше чем есть)
    maxWeight = ballsSum < maxWeight ? ballsSum : maxWeight
    let totalLoot = 0

    const ballsTheifBag = ballsProcent.map(item => {
        totalLoot += Math.floor(maxWeight * item / 100)

        return Math.floor(maxWeight * item / 100)
    })

    if (totalLoot < maxWeight) {
        // доложить шары, если есть место
        addBallsToBag(ballsTheifBag, ballsProcent, maxWeight, totalLoot)
    }

    return ballsTheifBag
}

function addBallsToBag(ballsTheifBag, ballsProcent, maxWeight, totalLoot,) {
    const buffArrWithClearProcent = ballsProcent.map(item => {
        const numb = maxWeight * item / 100

        return (numb % 1 === 0) ? 0 : numb
    })



    while (maxWeight - totalLoot !== 0) {
        const indexMostProcent = buffArrWithClearProcent.indexOf(Math.max(...buffArrWithClearProcent))

        ballsTheifBag[indexMostProcent] += 1
        buffArrWithClearProcent[indexMostProcent] = 0
        totalLoot++
    }
}

function chekZero(arrBalls, maxWeight) {
    return (arrBalls === 0 || maxWeight === 0 || Math.max(...arrBalls) === 0) ? true : false
}
