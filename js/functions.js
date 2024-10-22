// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы. Примеры использования функции:

function maxStringLength (string, maxLength) {
  return string.length <= maxLength;
}

// Строка короче 20 символов
maxStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
maxStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
maxStringLength('проверяемая строка', 10); // false


// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево

function palindromeRevise(string) {
  const normalString = string.toLowerCase().replaceAll(' ', '');
  let result = false;
  for (let i = 0; i < normalString.length / 2; i++) {
    result = normalString[i] === normalString[normalString.length - 1 - i];
  }
  return result;
}

// Строка является палиндромом
palindromeRevise('топот'); // true
// Несмотря на разный регистр, тоже палиндром
palindromeRevise('ДовОд'); // true
// Это не палиндром
palindromeRevise('Кекс'); // false
// Это палиндром
palindromeRevise('Лёша на полке клопа нашёл '); // true


// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

function numbersInString(string) {
  const normalString = string.toString();
  let result = '';
  for (let i = 0; i < normalString.length; i++) {
    if (!isNaN(parseInt(normalString[i], 10))) {
      result += normalString[i];
    }
  }
  return result.length ? Number(result) : NaN;
}

numbersInString('2023 год'); // 2023
numbersInString('ECMAScript 2022'); // 2022
numbersInString('1 кефир, 0.5 батона'); // 105
numbersInString('агент 007'); // 7
numbersInString('а я томат'); // NaN
numbersInString(2023); // 2023
numbersInString(-1); // 1
numbersInString(1.5); // 15
