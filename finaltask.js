/* 
const balls = [1, 1, 2, 1]
const bag = 2                               //mustBeAnsw : [ 1, 0, 1, 0 ]
*/
/* const balls = [100, 300, 200]
const bag = 3     */                        //mustBeAnsw : [ 0, 2, 1 ]
/*
const balls = [100, 300, 200]
const bag = 120                             //mustBeAnsw : [20, 60, 40]
*/
/*
const ballsF = [100, 300, 200, 700, 140]
const bag = 0                               //mustBeAnsw : 0
*/
const balls = [0, 0, 2]
const bag = 3                               //mustBeAnsw : [0, 0, 2]

const answ = calcBalls(balls, bag)
console.log(answ)

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
        const procent = Math.floor(item)

        totalLoot += Math.round(maxWeight * procent / 100)

        return Math.round(maxWeight * procent / 100)
    })

    if (totalLoot < maxWeight && ballsSum > bag) {
        // доложить шары, если есть место
        addBallToZero(ballsTheifBag, maxWeight, totalLoot)
    }

    return ballsTheifBag
}

function addBallToZero(ballsTheifBag, maxWeight, totalLoot) {

    for (let i = 0; i < ballsTheifBag.length && maxWeight - totalLoot !== 0; i++) {

        if (ballsTheifBag[i] === 0) {
            ballsTheifBag[i] = 1
            totalLoot += 1
        }
    }
}

function chekZero(arrBalls, maxWeight) {
    return (arrBalls === 0 || maxWeight === 0 || Math.max(...arrBalls) === 0) ? true : false
}