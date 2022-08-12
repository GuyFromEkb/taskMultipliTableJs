console.log(calcBalls([10, 10, 10], 100))               //mustBeAnsw : [ 10, 10, 10]
console.log(calcBalls([1, 1, 2, 1], 2))                 //mustBeAnsw : [ 1, 0, 1, 0 ]
console.log(calcBalls([100, 300, 200], 3))              //mustBeAnsw : [ 0, 2, 1 ]
console.log(calcBalls([100, 300, 200], 120))            //mustBeAnsw : [20, 60, 40]
console.log(calcBalls([100, 300, 200, 700, 140], 0))    //mustBeAnsw : 0
console.log(calcBalls([0, 0, 0], 0))                    //mustBeAnsw : 0
console.log(calcBalls([0, 0, 2], 3))                    //mustBeAnsw : [0, 0, 2]

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

	if (totalLoot < maxWeight && ballsSum > maxWeight) {
		// доложить шары, если есть место
		addBallToZero(ballsTheifBag, ballsProcent, maxWeight, totalLoot)
	}

	return ballsTheifBag
}

function addBallToZero(ballsTheifBag, ballsProcent, maxWeight, totalLoot,) {

	for (let i = 0; i < ballsTheifBag.length && maxWeight - totalLoot !== 0; i++) {

		if (ballsTheifBag[i] === 0) {
			ballsTheifBag[i] = 1
			totalLoot++

			continue
		}
		const buffProcent = Math.round(ballsProcent[i])
		const buffBall = Math.round(maxWeight * buffProcent / 100)

		if (buffBall - ballsTheifBag[i] === 1) {
			ballsTheifBag[i] = buffBall
			totalLoot++
		}
	}
}

function chekZero(arrBalls, maxWeight) {
	return (arrBalls === 0 || maxWeight === 0 || Math.max(...arrBalls) === 0) ? true : false
}
