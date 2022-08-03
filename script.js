const NUMBER = 24

multipliTable(NUMBER)

function multipliTable(numb) {
	if (typeof numb !== "number" || numb < 1) {
		console.log("Нужно ввести число, которое больше 0!")
		return
	}

	for (let i = 1; i <= numb; i++) {
		let rowStr = ""
		let header = ""

		for (let j = 1; j <= numb; j++) {
			if (i === 1) {
				header += printNumb(i, j, numb) + " "
			}
			if (j === 1) {
				rowStr += printNumb(i, j, numb) + "|"
			}

			rowStr += printNumb(i, j, numb) + " "
		}

		if (header) {
			printHeader(i, numb, header)
		}

		console.log(rowStr)
	}
}

function printNumb(rowNumb, tableNumb, numb) {
	return " ".repeat(getLength(rowNumb, tableNumb, numb)) + rowNumb * tableNumb
}

function getLength(rowNumb, tableNumb, numb) {
	const lengthTable = (rowNumb * tableNumb).toString().length
	const maxLengthTable = (tableNumb * numb).toString().length

	return maxLengthTable - lengthTable
}

function printHeader(rowNumb, numb, headerStr) {
	const headerSpaceLength = (numb * rowNumb).toString().length

	let strLine = numb.toString()

	for (let i = 1; i <= numb; i++) {
		strLine += i * numb
	}

	console.log(" ".repeat(headerSpaceLength + 1) + headerStr)
	console.log("-".repeat(strLine.length + numb))
}
