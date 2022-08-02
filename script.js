const NUMBER = 45

multipliTable(NUMBER)

function multipliTable(num) {

    if (typeof (num) !== "number" || num < 1) {
        console.log('Нужно ввести число, которое больше 0!')
        return
    }

    //массив массивов таблицы умножения до заданного числа
    const numArr = createArray(num)
    // console.log(numArr)

    //массив максимальной длины числа в столбце, индекс соответствует индексу в массиве таблицы умножения
    const spaceCountArr = countSpaceForDigit(numArr)
    // console.log(spaceCountArr)

    //массив массивов таблицы умножения с выровненными по правому краю значениями
    const alignDigitArr = alignDigitToRight(numArr, spaceCountArr)
    // console.log(alignDigitArr)

    //вывод в консоль
    renderToConsole(alignDigitArr)
}

function createArray(num) {
    let buffArr = []

    for (let i = 1; i <= num; i++) {

        let strDigit = ''

        for (let j = 1; j <= num; j++) {
            strDigit += " " + (i * j)
        }
        buffArr.push(strDigit)
    }

    //создать массив без первого индекса (пустой разделитель)
    const MainArr = buffArr.map(item => item.split(' ').slice(1))

    return (MainArr)
}

function countSpaceForDigit(numArr) {
    const arr = [...numArr]

    const spaceCountArr = arr.reverse()[0].map(item => item.length)

    return spaceCountArr
}

function alignDigitToRight(numArr, spaceCountArr) {

    const alignDigitArr = numArr.map(row => {
        return (
            row.map((digit, index) =>
            (   //если длинна цифры меньше чем максимальная длинна цифры в строке, то прибавить кол-во пробелов для выравнивания 
                //или вернуть цифру без изменения
                digit.length < spaceCountArr[index] ? (" ".repeat(spaceCountArr[index] - digit.length)) + digit : digit)
            )
        )
    })
    return alignDigitArr
}

function renderToConsole(alignDigitArr) {
    //максимальная длина цифр в 1 колонке
    const firstColumnLength = alignDigitArr.length.toString().length

    alignDigitArr.forEach((item, index) => {

        //первая цифра в колонке + |
        const firstColumnDigit = firstColumRenderToConsole(index, firstColumnLength)

        //разделительная полоса
        if (index === 0) {
            firstRowRenderToConsole(alignDigitArr, firstColumnLength, item)
        }

        console.log(firstColumnDigit, item.join(' '))
    })

}

function firstColumRenderToConsole(index, firstColumnLength) {
    //индексация начало с 1
    const i = index + 1
    //если номер "короче", чем макс длина цифр в колонке то прибавить недостающие кол-во пробелов + разделитель |
    if (i.toString().length < firstColumnLength) {
        return " ".repeat(firstColumnLength - i.toString().length) + i + '|'
    }

    return i.toString() + '|'
}

function firstRowRenderToConsole(numArr, firstColumnLength, firstRowArr) {
    //получаем общую максимальную длину символов строке, без пробелов
    const rowLengthWithoutSpace = numArr[numArr.length - 1].join('').length

    // отступить весь 1ый столбец + полоска (1) + пробел от края (1) + вся первая строка для нумерации
    console.log(" ".repeat(firstColumnLength + 2) + firstRowArr.join(' '))

    //количество  символов в строке + количество пробелов + отступ слева + пробел (1)
    const repeatNumbForLine = rowLengthWithoutSpace + numArr.length + (firstColumnLength + 1)
    console.log('-'.repeat(repeatNumbForLine))
}