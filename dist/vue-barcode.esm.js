/*!
 * vue-barcode v0.1.0
 * https://github.com/xkeshi/vue-barcode
 *
 * Copyright (c) 2017 xkeshi
 * Released under the MIT license
 *
 * Date: 2017-04-28T09:22:46.655Z
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Barcode = function Barcode(data, options) {
	classCallCheck(this, Barcode);

	this.data = data;
	this.text = options.text || data;
	this.options = options;
};

// Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function (_Barcode) {
	inherits(CODE39, _Barcode);

	function CODE39(data, options) {
		classCallCheck(this, CODE39);

		data = data.toUpperCase();

		// Calculate mod43 checksum if enabled
		if (options.mod43) {
			data += getCharacter(mod43checksum(data));
		}

		return possibleConstructorReturn(this, (CODE39.__proto__ || Object.getPrototypeOf(CODE39)).call(this, data, options));
	}

	createClass(CODE39, [{
		key: "encode",
		value: function encode() {
			// First character is always a *
			var result = getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.data.length; i++) {
				result += getEncoding(this.data[i]) + "0";
			}

			// Last character is always a *
			result += getEncoding("*");

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		}
	}]);
	return CODE39;
}(Barcode);

// All characters. The position in the array is the (checksum) value


var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

// The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function
var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

// Get the binary representation of a character by converting the encodings
// from decimal to binary
function getEncoding(character) {
	return getBinary(characterValue(character));
}

function getBinary(characterValue) {
	return encodings[characterValue].toString(2);
}

function getCharacter(characterValue) {
	return characters[characterValue];
}

function characterValue(character) {
	return characters.indexOf(character);
}

function mod43checksum(data) {
	var checksum = 0;
	for (var i = 0; i < data.length; i++) {
		checksum += characterValue(data[i]);
	}

	checksum = checksum % 43;
	return checksum;
}

// This is the master class, it does require the start code to be
// included in the string

var CODE128$1 = function (_Barcode) {
	inherits(CODE128, _Barcode);

	function CODE128(data, options) {
		classCallCheck(this, CODE128);

		// Fill the bytes variable with the ascii codes of string
		var _this = possibleConstructorReturn(this, (CODE128.__proto__ || Object.getPrototypeOf(CODE128)).call(this, data.substring(1), options));

		_this.bytes = [];
		for (var i = 0; i < data.length; ++i) {
			_this.bytes.push(data.charCodeAt(i));
		}

		// Data for each character, the last characters will not be encoded but are used for error correction
		// Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
		_this.encodings = [// + 1000
		740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
		return _this;
	}

	// The public encoding function


	createClass(CODE128, [{
		key: "encode",
		value: function encode() {
			var encodingResult;
			var bytes = this.bytes;
			// Remove the startcode from the bytes and set its index
			var startIndex = bytes.shift() - 105;

			// Start encode with the right type
			if (startIndex === 103) {
				encodingResult = this.nextA(bytes, 1);
			} else if (startIndex === 104) {
				encodingResult = this.nextB(bytes, 1);
			} else if (startIndex === 105) {
				encodingResult = this.nextC(bytes, 1);
			} else {
				throw new InvalidStartCharacterException();
			}

			return {
				text: this.text == this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
				data:
				// Add the start bits
				this.getEncoding(startIndex) +
				// Add the encoded bits
				encodingResult.result +
				// Add the checksum
				this.getEncoding((encodingResult.checksum + startIndex) % 103) +
				// Add the end bits
				this.getEncoding(106)
			};
		}
	}, {
		key: "getEncoding",
		value: function getEncoding(n) {
			return this.encodings[n] ? (this.encodings[n] + 1000).toString(2) : '';
		}

		// Use the regexp variable for validation

	}, {
		key: "valid",
		value: function valid() {
			// ASCII value ranges 0-127, 200-211
			return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1;
		}
	}, {
		key: "nextA",
		value: function nextA(bytes, depth) {
			if (bytes.length <= 0) {
				return { "result": "", "checksum": 0 };
			}

			var next, index;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes[0] - 105;

				// Remove first element
				bytes.shift();

				// Swap to CODE128C
				if (index === 99) {
					next = this.nextC(bytes, depth + 1);
				}
				// Swap to CODE128B
				else if (index === 100) {
						next = this.nextB(bytes, depth + 1);
					}
					// Shift
					else if (index === 98) {
							// Convert the next character so that is encoded correctly
							bytes[0] = bytes[0] > 95 ? bytes[0] - 96 : bytes[0];
							next = this.nextA(bytes, depth + 1);
						}
						// Continue on CODE128A but encode a special character
						else {
								next = this.nextA(bytes, depth + 1);
							}
			}
			// Continue encoding of CODE128A
			else {
					var charCode = bytes[0];
					index = charCode < 32 ? charCode + 64 : charCode - 32;

					// Remove first element
					bytes.shift();

					next = this.nextA(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = this.getEncoding(index);
			var weight = index * depth;

			return {
				"result": enc + next.result,
				"checksum": weight + next.checksum
			};
		}
	}, {
		key: "nextB",
		value: function nextB(bytes, depth) {
			if (bytes.length <= 0) {
				return { "result": "", "checksum": 0 };
			}

			var next, index;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes[0] - 105;

				// Remove first element
				bytes.shift();

				// Swap to CODE128C
				if (index === 99) {
					next = this.nextC(bytes, depth + 1);
				}
				// Swap to CODE128A
				else if (index === 101) {
						next = this.nextA(bytes, depth + 1);
					}
					// Shift
					else if (index === 98) {
							// Convert the next character so that is encoded correctly
							bytes[0] = bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
							next = this.nextB(bytes, depth + 1);
						}
						// Continue on CODE128B but encode a special character
						else {
								next = this.nextB(bytes, depth + 1);
							}
			}
			// Continue encoding of CODE128B
			else {
					index = bytes[0] - 32;
					bytes.shift();
					next = this.nextB(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = this.getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		}
	}, {
		key: "nextC",
		value: function nextC(bytes, depth) {
			if (bytes.length <= 0) {
				return { "result": "", "checksum": 0 };
			}

			var next, index;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes[0] - 105;

				// Remove first element
				bytes.shift();

				// Swap to CODE128B
				if (index === 100) {
					next = this.nextB(bytes, depth + 1);
				}
				// Swap to CODE128A
				else if (index === 101) {
						next = this.nextA(bytes, depth + 1);
					}
					// Continue on CODE128C but encode a special character
					else {
							next = this.nextC(bytes, depth + 1);
						}
			}
			// Continue encoding of CODE128C
			else {
					index = (bytes[0] - 48) * 10 + bytes[1] - 48;
					bytes.shift();
					bytes.shift();
					next = this.nextC(bytes, depth + 1);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = this.getEncoding(index);
			var weight = index * depth;

			return { "result": enc + next.result, "checksum": weight + next.checksum };
		}
	}]);
	return CODE128;
}(Barcode);

var InvalidStartCharacterException = function (_Error) {
	inherits(InvalidStartCharacterException, _Error);

	function InvalidStartCharacterException() {
		classCallCheck(this, InvalidStartCharacterException);

		var _this2 = possibleConstructorReturn(this, (InvalidStartCharacterException.__proto__ || Object.getPrototypeOf(InvalidStartCharacterException)).call(this));

		_this2.name = "InvalidStartCharacterException";
		_this2.message = "The encoding does not start with a start character.";
		return _this2;
	}

	return InvalidStartCharacterException;
}(Error);

var CODE128AUTO = function (_CODE) {
	inherits(CODE128AUTO, _CODE);

	function CODE128AUTO(data, options) {
		classCallCheck(this, CODE128AUTO);

		// ASCII value ranges 0-127, 200-211
		if (data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) {
			var _this = possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, autoSelectModes(data), options));
		} else {
			var _this = possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, data, options));
		}
		return possibleConstructorReturn(_this);
	}

	return CODE128AUTO;
}(CODE128$1);

function autoSelectModes(string) {
	// ASCII ranges 0-98 and 200-207 (FUNCs and SHIFTs)
	var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
	// ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
	var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
	// Number pairs or [FNC1]
	var cLength = string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

	var newString;
	// Select CODE128C if the string start with enough digits
	if (cLength >= 2) {
		newString = String.fromCharCode(210) + autoSelectFromC(string);
	}
	// Select A/C depending on the longest match
	else if (aLength > bLength) {
			newString = String.fromCharCode(208) + autoSelectFromA(string);
		} else {
			newString = String.fromCharCode(209) + autoSelectFromB(string);
		}

	newString = newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function (match, char) {
		return String.fromCharCode(203) + char;
	});

	return newString;
}

function autoSelectFromA(string) {
	var untilC = string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var aChars = string.match(/^[\x00-\x5F\xC8-\xCF]+/);
	if (aChars[0].length === string.length) {
		return string;
	}

	return aChars[0] + String.fromCharCode(205) + autoSelectFromB(string.substring(aChars[0].length));
}

function autoSelectFromB(string) {
	var untilC = string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var bChars = string.match(/^[\x20-\x7F\xC8-\xCF]+/);
	if (bChars[0].length === string.length) {
		return string;
	}

	return bChars[0] + String.fromCharCode(206) + autoSelectFromA(string.substring(bChars[0].length));
}

function autoSelectFromC(string) {
	var cMatch = string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
	var length = cMatch.length;

	if (length === string.length) {
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
	var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
	if (aLength >= bLength) {
		return cMatch + String.fromCharCode(206) + autoSelectFromA(string);
	} else {
		return cMatch + String.fromCharCode(205) + autoSelectFromB(string);
	}
}

var CODE128A = function (_CODE) {
	inherits(CODE128A, _CODE);

	function CODE128A(string, options) {
		classCallCheck(this, CODE128A);
		return possibleConstructorReturn(this, (CODE128A.__proto__ || Object.getPrototypeOf(CODE128A)).call(this, String.fromCharCode(208) + string, options));
	}

	createClass(CODE128A, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
		}
	}]);
	return CODE128A;
}(CODE128$1);

var CODE128B = function (_CODE) {
	inherits(CODE128B, _CODE);

	function CODE128B(string, options) {
		classCallCheck(this, CODE128B);
		return possibleConstructorReturn(this, (CODE128B.__proto__ || Object.getPrototypeOf(CODE128B)).call(this, String.fromCharCode(209) + string, options));
	}

	createClass(CODE128B, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
		}
	}]);
	return CODE128B;
}(CODE128$1);

var CODE128C = function (_CODE) {
	inherits(CODE128C, _CODE);

	function CODE128C(string, options) {
		classCallCheck(this, CODE128C);
		return possibleConstructorReturn(this, (CODE128C.__proto__ || Object.getPrototypeOf(CODE128C)).call(this, String.fromCharCode(210) + string, options));
	}

	createClass(CODE128C, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
		}
	}]);
	return CODE128C;
}(CODE128$1);

var EANencoder = function () {
	function EANencoder() {
		classCallCheck(this, EANencoder);

		// Standard start end and middle bits
		this.startBin = "101";
		this.endBin = "101";
		this.middleBin = "01010";

		// The L (left) type of encoding
		this.Lbinary = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];

		// The G type of encoding
		this.Gbinary = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];

		// The R (right) type of encoding
		this.Rbinary = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
	}

	// Convert a numberarray to the representing


	createClass(EANencoder, [{
		key: "encode",
		value: function encode(number, structure, separator) {
			// Create the variable that should be returned at the end of the function
			var result = "";

			// Make sure that the separator is set
			separator = separator || "";

			// Loop all the numbers
			for (var i = 0; i < number.length; i++) {
				// Using the L, G or R encoding and add it to the returning variable
				if (structure[i] == "L") {
					result += this.Lbinary[number[i]];
				} else if (structure[i] == "G") {
					result += this.Gbinary[number[i]];
				} else if (structure[i] == "R") {
					result += this.Rbinary[number[i]];
				}

				// Add separator in between encodings
				if (i < number.length - 1) {
					result += separator;
				}
			}
			return result;
		}
	}]);
	return EANencoder;
}();

// Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

var EAN13 = function (_Barcode) {
	inherits(EAN13, _Barcode);

	function EAN13(data, options) {
		classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		// Make sure the font is not bigger than the space between the guard bars
		var _this = possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

		if (!options.flat && options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;

		// Adds a last character to the end of the barcode
		_this.lastChar = options.lastChar;
		return _this;
	}

	createClass(EAN13, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{13}$/) !== -1 && this.data[12] == checksum(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}

		// Define the EAN-13 structure

	}, {
		key: "getStructure",
		value: function getStructure() {
			return ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
		}

		// The "standard" way of printing EAN13 barcodes with guard bars

	}, {
		key: "guardedEncoding",
		value: function guardedEncoding() {
			var encoder = new EANencoder();
			var result = [];

			var structure = this.getStructure()[this.data[0]];

			// Get the string to be encoded on the left side of the EAN code
			var leftSide = this.data.substr(1, 6);

			// Get the string to be encoded on the right side of the EAN code
			var rightSide = this.data.substr(7, 6);

			// Add the first digigt
			if (this.options.displayValue) {
				result.push({
					data: "000000000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: encoder.encode(leftSide, structure),
				text: this.text.substr(1, 6),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: encoder.encode(rightSide, "RRRRRR"),
				text: this.text.substr(7, 6),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			if (this.options.lastChar && this.options.displayValue) {
				result.push({ data: "00" });

				result.push({
					data: "00000",
					text: this.options.lastChar,
					options: { fontSize: this.fontSize }
				});
			}
			return result;
		}
	}, {
		key: "flatEncoding",
		value: function flatEncoding() {
			var encoder = new EANencoder();
			var result = "";

			var structure = this.getStructure()[this.data[0]];

			result += "101";
			result += encoder.encode(this.data.substr(1, 6), structure);
			result += "01010";
			result += encoder.encode(this.data.substr(7, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		}
	}]);
	return EAN13;
}(Barcode);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 0; i < 12; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 1; i < 12; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

// Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

var EAN8 = function (_Barcode) {
	inherits(EAN8, _Barcode);

	function EAN8(data, options) {
		classCallCheck(this, EAN8);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{7}$/) !== -1) {
			data += checksum$1(data);
		}

		return possibleConstructorReturn(this, (EAN8.__proto__ || Object.getPrototypeOf(EAN8)).call(this, data, options));
	}

	createClass(EAN8, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{8}$/) !== -1 && this.data[7] == checksum$1(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			var encoder = new EANencoder();

			// Create the return variable
			var result = "";

			// Get the number to be encoded on the left side of the EAN code
			var leftSide = this.data.substr(0, 4);

			// Get the number to be encoded on the right side of the EAN code
			var rightSide = this.data.substr(4, 4);

			// Add the start bits
			result += encoder.startBin;

			// Add the left side
			result += encoder.encode(leftSide, "LLLL");

			// Add the middle bits
			result += encoder.middleBin;

			// Add the right side
			result += encoder.encode(rightSide, "RRRR");

			// Add the end bits
			result += encoder.endBin;

			return {
				data: result,
				text: this.text
			};
		}
	}]);
	return EAN8;
}(Barcode);

// Calulate the checksum digit


function checksum$1(number) {
	var result = 0;

	var i;
	for (i = 0; i < 7; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	for (i = 1; i < 7; i += 2) {
		result += parseInt(number[i]);
	}

	return (10 - result % 10) % 10;
}

// Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

var EAN5 = function (_Barcode) {
	inherits(EAN5, _Barcode);

	function EAN5(data, options) {
		classCallCheck(this, EAN5);

		// Define the EAN-13 structure
		var _this = possibleConstructorReturn(this, (EAN5.__proto__ || Object.getPrototypeOf(EAN5)).call(this, data, options));

		_this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
		return _this;
	}

	createClass(EAN5, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{5}$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			var encoder = new EANencoder();
			var checksum = this.checksum();

			// Start bits
			var result = "1011";

			// Use normal ean encoding with 01 in between all digits
			result += encoder.encode(this.data, this.structure[checksum], "01");

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "checksum",
		value: function checksum() {
			var result = 0;

			result += parseInt(this.data[0]) * 3;
			result += parseInt(this.data[1]) * 9;
			result += parseInt(this.data[2]) * 3;
			result += parseInt(this.data[3]) * 9;
			result += parseInt(this.data[4]) * 3;

			return result % 10;
		}
	}]);
	return EAN5;
}(Barcode);

// Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

var EAN2 = function (_Barcode) {
	inherits(EAN2, _Barcode);

	function EAN2(data, options) {
		classCallCheck(this, EAN2);

		var _this = possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));

		_this.structure = ["LL", "LG", "GL", "GG"];
		return _this;
	}

	createClass(EAN2, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{2}$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			var encoder = new EANencoder();

			// Choose the structure based on the number mod 4
			var structure = this.structure[parseInt(this.data) % 4];

			// Start bits
			var result = "1011";

			// Encode the two digits with 01 in between
			result += encoder.encode(this.data, structure, "01");

			return {
				data: result,
				text: this.text
			};
		}
	}]);
	return EAN2;
}(Barcode);

// Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

var UPC = function (_Barcode) {
	inherits(UPC, _Barcode);

	function UPC(data, options) {
		classCallCheck(this, UPC);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{11}$/) !== -1) {
			data += checksum$2(data);
		}

		var _this = possibleConstructorReturn(this, (UPC.__proto__ || Object.getPrototypeOf(UPC)).call(this, data, options));

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	createClass(UPC, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum$2(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: "flatEncoding",
		value: function flatEncoding() {
			var encoder = new EANencoder();
			var result = "";

			result += "101";
			result += encoder.encode(this.data.substr(0, 6), "LLLLLL");
			result += "01010";
			result += encoder.encode(this.data.substr(6, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "guardedEncoding",
		value: function guardedEncoding() {
			var encoder = new EANencoder();
			var result = [];

			// Add the first digigt
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101" + encoder.encode(this.data[0], "L"),
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: encoder.encode(this.data.substr(1, 5), "LLLLL"),
				text: this.text.substr(1, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: encoder.encode(this.data.substr(6, 5), "RRRRR"),
				text: this.text.substr(6, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: encoder.encode(this.data[11], "R") + "101",
				options: { height: this.guardHeight }
			});

			// Add the last digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(11, 1),
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}]);
	return UPC;
}(Barcode);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum$2(number) {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

var ITF14 = function (_Barcode) {
	inherits(ITF14, _Barcode);

	function ITF14(data, options) {
		classCallCheck(this, ITF14);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{13}$/) !== -1) {
			data += checksum$3(data);
		}

		var _this = possibleConstructorReturn(this, (ITF14.__proto__ || Object.getPrototypeOf(ITF14)).call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	createClass(ITF14, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{14}$/) !== -1 && this.data[13] == checksum$3(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += this.calculatePair(this.data.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.text
			};
		}

		// Calculate the data of a number pair

	}, {
		key: "calculatePair",
		value: function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		}
	}]);
	return ITF14;
}(Barcode);

// Calulate the checksum digit


function checksum$3(data) {
	var result = 0;

	for (var i = 0; i < 13; i++) {
		result += parseInt(data[i]) * (3 - i % 2 * 2);
	}

	return Math.ceil(result / 10) * 10 - result;
}

var ITF = function (_Barcode) {
	inherits(ITF, _Barcode);

	function ITF(data, options) {
		classCallCheck(this, ITF);

		var _this = possibleConstructorReturn(this, (ITF.__proto__ || Object.getPrototypeOf(ITF)).call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	createClass(ITF, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^([0-9]{2})+$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			// Always add the same start bits
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < this.data.length; i += 2) {
				result += this.calculatePair(this.data.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.text
			};
		}

		// Calculate the data of a number pair

	}, {
		key: "calculatePair",
		value: function calculatePair(numberPair) {
			var result = "";

			var number1Struct = this.binaryRepresentation[numberPair[0]];
			var number2Struct = this.binaryRepresentation[numberPair[1]];

			// Take every second bit and add to the result
			for (var i = 0; i < 5; i++) {
				result += number1Struct[i] == "1" ? "111" : "1";
				result += number2Struct[i] == "1" ? "000" : "0";
			}

			return result;
		}
	}]);
	return ITF;
}(Barcode);

// Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

var MSI = function (_Barcode) {
	inherits(MSI, _Barcode);

	function MSI(data, options) {
		classCallCheck(this, MSI);
		return possibleConstructorReturn(this, (MSI.__proto__ || Object.getPrototypeOf(MSI)).call(this, data, options));
	}

	createClass(MSI, [{
		key: "encode",
		value: function encode() {
			// Start bits
			var ret = "110";

			for (var i = 0; i < this.data.length; i++) {
				// Convert the character to binary (always 4 binary digits)
				var digit = parseInt(this.data[i]);
				var bin = digit.toString(2);
				bin = addZeroes(bin, 4 - bin.length);

				// Add 100 for every zero and 110 for every 1
				for (var b = 0; b < bin.length; b++) {
					ret += bin[b] == "0" ? "100" : "110";
				}
			}

			// End bits
			ret += "1001";

			return {
				data: ret,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]+$/) !== -1;
		}
	}]);
	return MSI;
}(Barcode);

function addZeroes(number, n) {
	for (var i = 0; i < n; i++) {
		number = "0" + number;
	}
	return number;
}

function mod10(number) {
	var sum = 0;
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[i]);
		if ((i + number.length) % 2 === 0) {
			sum += n;
		} else {
			sum += n * 2 % 10 + Math.floor(n * 2 / 10);
		}
	}
	return (10 - sum % 10) % 10;
}

function mod11(number) {
	var sum = 0;
	var weights = [2, 3, 4, 5, 6, 7];
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[number.length - 1 - i]);
		sum += weights[i % weights.length] * n;
	}
	return (11 - sum % 11) % 11;
}

var MSI10 = function (_MSI) {
	inherits(MSI10, _MSI);

	function MSI10(data, options) {
		classCallCheck(this, MSI10);
		return possibleConstructorReturn(this, (MSI10.__proto__ || Object.getPrototypeOf(MSI10)).call(this, data + mod10(data), options));
	}

	return MSI10;
}(MSI);

var MSI11 = function (_MSI) {
	inherits(MSI11, _MSI);

	function MSI11(data, options) {
		classCallCheck(this, MSI11);
		return possibleConstructorReturn(this, (MSI11.__proto__ || Object.getPrototypeOf(MSI11)).call(this, data + mod11(data), options));
	}

	return MSI11;
}(MSI);

var MSI1010 = function (_MSI) {
	inherits(MSI1010, _MSI);

	function MSI1010(data, options) {
		classCallCheck(this, MSI1010);

		data += mod10(data);
		data += mod10(data);
		return possibleConstructorReturn(this, (MSI1010.__proto__ || Object.getPrototypeOf(MSI1010)).call(this, data, options));
	}

	return MSI1010;
}(MSI);

var MSI1110 = function (_MSI) {
	inherits(MSI1110, _MSI);

	function MSI1110(data, options) {
		classCallCheck(this, MSI1110);

		data += mod11(data);
		data += mod10(data);
		return possibleConstructorReturn(this, (MSI1110.__proto__ || Object.getPrototypeOf(MSI1110)).call(this, data, options));
	}

	return MSI1110;
}(MSI);

// Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function (_Barcode) {
	inherits(pharmacode, _Barcode);

	function pharmacode(data, options) {
		classCallCheck(this, pharmacode);

		var _this = possibleConstructorReturn(this, (pharmacode.__proto__ || Object.getPrototypeOf(pharmacode)).call(this, data, options));

		_this.number = parseInt(data, 10);
		return _this;
	}

	createClass(pharmacode, [{
		key: "encode",
		value: function encode() {
			var z = this.number;
			var result = "";

			// http://i.imgur.com/RMm4UDJ.png
			// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
			while (!isNaN(z) && z != 0) {
				if (z % 2 === 0) {
					// Even
					result = "11100" + result;
					z = (z - 2) / 2;
				} else {
					// Odd
					result = "100" + result;
					z = (z - 1) / 2;
				}
			}

			// Remove the two last zeroes
			result = result.slice(0, -2);

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.number >= 3 && this.number <= 131070;
		}
	}]);
	return pharmacode;
}(Barcode);

// Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

var codabar = function (_Barcode) {
	inherits(codabar, _Barcode);

	function codabar(data, options) {
		classCallCheck(this, codabar);

		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
			data = "A" + data + "A";
		}

		var _this = possibleConstructorReturn(this, (codabar.__proto__ || Object.getPrototypeOf(codabar)).call(this, data.toUpperCase(), options));

		_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
		return _this;
	}

	createClass(codabar, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = [];
			var encodings = this.getEncodings();
			for (var i = 0; i < this.data.length; i++) {
				result.push(encodings[this.data.charAt(i)]);
				// for all characters except the last, append a narrow-space ("0")
				if (i !== this.data.length - 1) {
					result.push("0");
				}
			}
			return {
				text: this.text,
				data: result.join('')
			};
		}
	}, {
		key: "getEncodings",
		value: function getEncodings() {
			return {
				"0": "101010011",
				"1": "101011001",
				"2": "101001011",
				"3": "110010101",
				"4": "101101001",
				"5": "110101001",
				"6": "100101011",
				"7": "100101101",
				"8": "100110101",
				"9": "110100101",
				"-": "101001101",
				"$": "101100101",
				":": "1101011011",
				"/": "1101101011",
				".": "1101101101",
				"+": "101100110011",
				"A": "1011001001",
				"B": "1010010011",
				"C": "1001001011",
				"D": "1010011001"
			};
		}
	}]);
	return codabar;
}(Barcode);

var GenericBarcode = function (_Barcode) {
	inherits(GenericBarcode, _Barcode);

	function GenericBarcode(data, options) {
		classCallCheck(this, GenericBarcode);
		return possibleConstructorReturn(this, (GenericBarcode.__proto__ || Object.getPrototypeOf(GenericBarcode)).call(this, data, options)); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided


	createClass(GenericBarcode, [{
		key: "encode",
		value: function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.text
			};
		}

		// Resturn true/false if the string provided is valid for this encoder

	}, {
		key: "valid",
		value: function valid() {
			return true;
		}
	}]);
	return GenericBarcode;
}(Barcode);

var barcodes = {
	CODE39: CODE39,
	CODE128: CODE128AUTO, CODE128A: CODE128A, CODE128B: CODE128B, CODE128C: CODE128C,
	EAN13: EAN13, EAN8: EAN8, EAN5: EAN5, EAN2: EAN2, UPC: UPC,
	ITF14: ITF14,
	ITF: ITF,
	MSI: MSI, MSI10: MSI10, MSI11: MSI11, MSI1010: MSI1010, MSI1110: MSI1110,
	pharmacode: pharmacode,
	codabar: codabar,
	GenericBarcode: GenericBarcode
};

function merge$1(old, replaceObj) {
	var newMerge = {};
	var k;
	for (k in old) {
		if (old.hasOwnProperty(k)) {
			newMerge[k] = old[k];
		}
	}
	for (k in replaceObj) {
		if (replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined") {
			newMerge[k] = replaceObj[k];
		}
	}
	return newMerge;
}

// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
// Convert to [1-1, 1-2, 2, 3-1, 3-2]
function linearizeEncodings$1(encodings) {
	var linearEncodings = [];
	function nextLevel(encoded) {
		if (Array.isArray(encoded)) {
			for (var i = 0; i < encoded.length; i++) {
				nextLevel(encoded[i]);
			}
		} else {
			encoded.text = encoded.text || "";
			encoded.data = encoded.data || "";
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings);

	return linearEncodings;
}

function fixOptions$1(options) {
	// Fix the margins
	options.marginTop = options.marginTop || options.margin;
	options.marginBottom = options.marginBottom || options.margin;
	options.marginRight = options.marginRight || options.margin;
	options.marginLeft = options.marginLeft || options.margin;

	return options;
}

// Convert string to integers/booleans where it should be
function optionsFromStrings$1(options) {
	var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

	for (var intOption in intOptions) {
		if (intOptions.hasOwnProperty(intOption)) {
			intOption = intOptions[intOption];
			if (typeof options[intOption] === "string") {
				options[intOption] = parseInt(options[intOption], 10);
			}
		}
	}

	if (typeof options["displayValue"] === "string") {
		options["displayValue"] = options["displayValue"] != "false";
	}

	return options;
}

var defaults$1 = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: undefined,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: function valid() {}
};

function getOptionsFromElement(element) {
	var options = {};
	for (var property in defaults$1) {
		if (defaults$1.hasOwnProperty(property)) {
			// jsbarcode-*
			if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
				options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
			}

			// data-*
			if (element.hasAttribute("data-" + property.toLowerCase())) {
				options[property] = element.getAttribute("data-" + property.toLowerCase());
			}
		}
	}

	options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

	// Since all atributes are string they need to be converted to integers
	options = optionsFromStrings$1(options);

	return options;
}

function getEncodingHeight(encoding, options) {
	return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == "left") {
			return 0;
		} else if (options.textAlign == "right") {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
	for (var i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = merge$1(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth;
		if (options.displayValue) {
			textWidth = messureText(encoding.text, options, context);
		} else {
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings) {
	var totalWidth = 0;
	for (var i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
	var maxHeight = 0;
	for (var i = 0; i < encodings.length; i++) {
		if (encodings[i].height > maxHeight) {
			maxHeight = encodings[i].height;
		}
	}
	return maxHeight;
}

function messureText(string, options, context) {
	var ctx;
	if (typeof context === "undefined") {
		ctx = document.createElement("canvas").getContext("2d");
	} else {
		ctx = context;
	}

	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var size = ctx.measureText(string).width;

	return size;
}

var CanvasRenderer = function () {
	function CanvasRenderer(canvas, encodings, options) {
		classCallCheck(this, CanvasRenderer);

		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	createClass(CanvasRenderer, [{
		key: "render",
		value: function render() {
			// Abort if the browser does not support HTML5 canvas
			if (!this.canvas.getContext) {
				throw new Error('The browser does not support canvas.');
			}

			this.prepareCanvas();
			for (var i = 0; i < this.encodings.length; i++) {
				var encodingOptions = merge$1(this.options, this.encodings[i].options);

				this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
				this.drawCanvasText(encodingOptions, this.encodings[i]);

				this.moveCanvasDrawing(this.encodings[i]);
			}

			this.restoreCanvas();
		}
	}, {
		key: "prepareCanvas",
		value: function prepareCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.save();

			calculateEncodingAttributes(this.encodings, this.options, ctx);
			var totalWidth = getTotalWidthOfEncodings(this.encodings);
			var maxHeight = getMaximumHeightOfEncodings(this.encodings);

			this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

			this.canvas.height = maxHeight;

			// Paint the canvas
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.options.background) {
				ctx.fillStyle = this.options.background;
				ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			}

			ctx.translate(this.options.marginLeft, 0);
		}
	}, {
		key: "drawCanvasBarcode",
		value: function drawCanvasBarcode(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.marginTop + options.fontSize + options.textMargin;
			} else {
				yFrom = options.marginTop;
			}

			ctx.fillStyle = options.lineColor;

			for (var b = 0; b < binary.length; b++) {
				var x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					ctx.fillRect(x, yFrom, options.width, options.height);
				} else if (binary[b]) {
					ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
				}
			}
		}
	}, {
		key: "drawCanvasText",
		value: function drawCanvasText(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				if (options.textPosition == "top") {
					y = options.marginTop + options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.marginTop + options.fontSize;
				}

				ctx.font = font;

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					ctx.textAlign = 'left';
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					ctx.textAlign = 'right';
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						ctx.textAlign = 'center';
					}

				ctx.fillText(encoding.text, x, y);
			}
		}
	}, {
		key: "moveCanvasDrawing",
		value: function moveCanvasDrawing(encoding) {
			var ctx = this.canvas.getContext("2d");

			ctx.translate(encoding.width, 0);
		}
	}, {
		key: "restoreCanvas",
		value: function restoreCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.restore();
		}
	}]);
	return CanvasRenderer;
}();

var svgns = "http://www.w3.org/2000/svg";

var SVGRenderer = function () {
	function SVGRenderer(svg, encodings, options) {
		classCallCheck(this, SVGRenderer);

		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
	}

	createClass(SVGRenderer, [{
		key: "render",
		value: function render() {
			var currentX = this.options.marginLeft;

			this.prepareSVG();
			for (var i = 0; i < this.encodings.length; i++) {
				var encoding = this.encodings[i];
				var encodingOptions = merge$1(this.options, encoding.options);

				var group = createGroup(currentX, encodingOptions.marginTop, this.svg);

				setGroupOptions(group, encodingOptions);

				this.drawSvgBarcode(group, encodingOptions, encoding);
				this.drawSVGText(group, encodingOptions, encoding);

				currentX += encoding.width;
			}
		}
	}, {
		key: "prepareSVG",
		value: function prepareSVG() {
			// Clear the SVG
			while (this.svg.firstChild) {
				this.svg.removeChild(this.svg.firstChild);
			}

			calculateEncodingAttributes(this.encodings, this.options);
			var totalWidth = getTotalWidthOfEncodings(this.encodings);
			var maxHeight = getMaximumHeightOfEncodings(this.encodings);

			var width = totalWidth + this.options.marginLeft + this.options.marginRight;
			this.setSvgAttributes(width, maxHeight);

			if (this.options.background) {
				drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
			}
		}
	}, {
		key: "drawSvgBarcode",
		value: function drawSvgBarcode(parent, options, encoding) {
			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.fontSize + options.textMargin;
			} else {
				yFrom = 0;
			}

			var barWidth = 0;
			var x = 0;
			for (var b = 0; b < binary.length; b++) {
				x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					barWidth++;
				} else if (barWidth > 0) {
					drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
					barWidth = 0;
				}
			}

			// Last draw is needed since the barcode ends with 1
			if (barWidth > 0) {
				drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
			}
		}
	}, {
		key: "drawSVGText",
		value: function drawSVGText(parent, options, encoding) {
			var textElem = document.createElementNS(svgns, 'text');

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

				if (options.textPosition == "top") {
					y = options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.fontSize;
				}

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					textElem.setAttribute("text-anchor", "end");
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						textElem.setAttribute("text-anchor", "middle");
					}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(document.createTextNode(encoding.text));

				parent.appendChild(textElem);
			}
		}
	}, {
		key: "setSvgAttributes",
		value: function setSvgAttributes(width, height) {
			var svg = this.svg;
			svg.setAttribute("width", width + "px");
			svg.setAttribute("height", height + "px");
			svg.setAttribute("x", "0px");
			svg.setAttribute("y", "0px");
			svg.setAttribute("viewBox", "0 0 " + width + " " + height);

			svg.setAttribute("xmlns", svgns);
			svg.setAttribute("version", "1.1");

			svg.style.transform = "translate(0,0)";
		}
	}]);
	return SVGRenderer;
}();

function createGroup(x, y, parent) {
	var group = document.createElementNS(svgns, 'g');

	group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	parent.appendChild(group);

	return group;
}

function setGroupOptions(group, options) {
	group.setAttribute("style", "fill:" + options.lineColor + ";");
}

function drawRect(x, y, width, height, parent) {
	var rect = document.createElementNS(svgns, 'rect');

	rect.setAttribute("x", x);
	rect.setAttribute("y", y);
	rect.setAttribute("width", width);
	rect.setAttribute("height", height);

	parent.appendChild(rect);

	return rect;
}

var ObjectRenderer = function () {
	function ObjectRenderer(object, encodings, options) {
		classCallCheck(this, ObjectRenderer);

		this.object = object;
		this.encodings = encodings;
		this.options = options;
	}

	createClass(ObjectRenderer, [{
		key: "render",
		value: function render() {
			this.object.encodings = this.encodings;
		}
	}]);
	return ObjectRenderer;
}();

var renderers = { CanvasRenderer: CanvasRenderer, SVGRenderer: SVGRenderer, ObjectRenderer: ObjectRenderer };

var InvalidInputException = function (_Error) {
	inherits(InvalidInputException, _Error);

	function InvalidInputException(symbology, input) {
		classCallCheck(this, InvalidInputException);

		var _this = possibleConstructorReturn(this, (InvalidInputException.__proto__ || Object.getPrototypeOf(InvalidInputException)).call(this));

		_this.name = "InvalidInputException";

		_this.symbology = symbology;
		_this.input = input;

		_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
		return _this;
	}

	return InvalidInputException;
}(Error);

var InvalidElementException = function (_Error2) {
	inherits(InvalidElementException, _Error2);

	function InvalidElementException() {
		classCallCheck(this, InvalidElementException);

		var _this2 = possibleConstructorReturn(this, (InvalidElementException.__proto__ || Object.getPrototypeOf(InvalidElementException)).call(this));

		_this2.name = "InvalidElementException";
		_this2.message = "Not supported type to render on";
		return _this2;
	}

	return InvalidElementException;
}(Error);

var NoElementException = function (_Error3) {
	inherits(NoElementException, _Error3);

	function NoElementException() {
		classCallCheck(this, NoElementException);

		var _this3 = possibleConstructorReturn(this, (NoElementException.__proto__ || Object.getPrototypeOf(NoElementException)).call(this));

		_this3.name = "NoElementException";
		_this3.message = "No element to render on.";
		return _this3;
	}

	return NoElementException;
}(Error);

/* global HTMLImageElement */
/* global HTMLCanvasElement */
/* global SVGElement */

// Takes an element and returns an object with information about how
// it should be rendered
// This could also return an array with these objects
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
//   options (optional): Options that can be defined in the element
// }

function getRenderProperties(element) {
	// If the element is a string, query select call again
	if (typeof element === "string") {
		return querySelectedRenderProperties(element);
	}
	// If element is array. Recursivly call with every object in the array
	else if (Array.isArray(element)) {
			var returnArray = [];
			for (var i = 0; i < element.length; i++) {
				returnArray.push(getRenderProperties(element[i]));
			}
			return returnArray;
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				return newCanvasRenderProperties(element);
			}
			// If SVG
			else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
					return {
						element: element,
						options: getOptionsFromElement(element),
						renderer: renderers.SVGRenderer
					};
				}
				// If canvas (in browser)
				else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
						return {
							element: element,
							options: getOptionsFromElement(element),
							renderer: renderers.CanvasRenderer
						};
					}
					// If canvas (in node)
					else if (element && element.getContext) {
							return {
								element: element,
								renderer: renderers.CanvasRenderer
							};
						} else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === 'object' && !element.nodeName) {
							return {
								element: element,
								renderer: renderers.ObjectRenderer
							};
						} else {
							throw new InvalidElementException();
						}
}

function querySelectedRenderProperties(string) {
	var selector = document.querySelectorAll(string);
	if (selector.length === 0) {
		return undefined;
	} else {
		var returnArray = [];
		for (var i = 0; i < selector.length; i++) {
			returnArray.push(getRenderProperties(selector[i]));
		}
		return returnArray;
	}
}

function newCanvasRenderProperties(imgElement) {
	var canvas = document.createElement('canvas');
	return {
		element: canvas,
		options: getOptionsFromElement(imgElement),
		renderer: renderers.CanvasRenderer,
		afterRender: function afterRender() {
			imgElement.setAttribute("src", canvas.toDataURL());
		}
	};
}

/*eslint no-console: 0 */

var ErrorHandler = function () {
	function ErrorHandler(api) {
		classCallCheck(this, ErrorHandler);

		this.api = api;
	}

	createClass(ErrorHandler, [{
		key: "handleCatch",
		value: function handleCatch(e) {
			// If babel supported extending of Error in a correct way instanceof would be used here
			if (e.name === "InvalidInputException") {
				if (this.api._options.valid !== this.api._defaults.valid) {
					this.api._options.valid(false);
				} else {
					throw e.message;
				}
			} else {
				throw e;
			}

			this.api.render = function () {};
		}
	}, {
		key: "wrapBarcodeCall",
		value: function wrapBarcodeCall(func) {
			try {
				var result = func.apply(undefined, arguments);
				this.api._options.valid(true);
				return result;
			} catch (e) {
				this.handleCatch(e);

				return this.api;
			}
		}
	}]);
	return ErrorHandler;
}();

// Import all the barcodes
// Help functions
// Exceptions
// Default values
// The protype of the object returned from the JsBarcode() call
var API = function API() {};

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers
var JsBarcode = function JsBarcode(element, text, options) {
	var api = new API();

	if (typeof element === "undefined") {
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = getRenderProperties(element);
	api._encodings = [];
	api._options = defaults$1;
	api._errorHandler = new ErrorHandler(api);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== "undefined") {
		options = options || {};

		if (!options.format) {
			options.format = autoSelectBarcode();
		}

		api.options(options)[options.format](text, options).render();
	}

	return api;
};

// To make tests work TODO: remove
JsBarcode.getModule = function (name) {
	return barcodes[name];
};

// Register all barcodes
for (var name in barcodes) {
	if (barcodes.hasOwnProperty(name)) {
		// Security check if the propery is a prototype property
		registerBarcode(barcodes, name);
	}
}
function registerBarcode(barcodes$$1, name) {
	API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
		var api = this;
		return api._errorHandler.wrapBarcodeCall(function () {
			// Ensure text is options.text
			options.text = typeof options.text === 'undefined' ? undefined : '' + options.text;

			var newOptions = merge$1(api._options, options);
			newOptions = optionsFromStrings$1(newOptions);
			var Encoder = barcodes$$1[name];
			var encoded = encode(text, Encoder, newOptions);
			api._encodings.push(encoded);

			return api;
		});
	};
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, Encoder, options) {
	// Ensure that text is a string
	text = "" + text;

	var encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!encoder.valid()) {
		throw new InvalidInputException(encoder.constructor.name, text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	var encoded = encoder.encode();

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]
	encoded = linearizeEncodings$1(encoded);

	// Merge
	for (var i = 0; i < encoded.length; i++) {
		encoded[i].options = merge$1(options, encoded[i].options);
	}

	return encoded;
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (barcodes["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(barcodes)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function (options) {
	this._options = merge$1(this._options, options);
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function (size) {
	var zeroes = "0".repeat(size);
	this._encodings.push({ data: zeroes });
	return this;
};

// Initialize JsBarcode on all HTML elements defined.
API.prototype.init = function () {
	// Should do nothing if no elements where found
	if (!this._renderProperties) {
		return;
	}

	// Make sure renderProperies is an array
	if (!Array.isArray(this._renderProperties)) {
		this._renderProperties = [this._renderProperties];
	}

	var renderProperty;
	for (var i in this._renderProperties) {
		renderProperty = this._renderProperties[i];
		var options = merge$1(this._options, renderProperty.options);

		if (options.format == "auto") {
			options.format = autoSelectBarcode();
		}

		this._errorHandler.wrapBarcodeCall(function () {
			var text = options.value;
			var Encoder = barcodes[options.format.toUpperCase()];
			var encoded = encode(text, Encoder, options);

			render(renderProperty, encoded, options);
		});
	}
};

// The render API call. Calls the real render function.
API.prototype.render = function () {
	if (!this._renderProperties) {
		throw new NoElementException();
	}

	if (Array.isArray(this._renderProperties)) {
		for (var i = 0; i < this._renderProperties.length; i++) {
			render(this._renderProperties[i], this._encodings, this._options);
		}
	} else {
		render(this._renderProperties, this._encodings, this._options);
	}

	return this;
};

API.prototype._defaults = defaults$1;

// Prepares the encodings and calls the renderer
function render(renderProperties, encodings, options) {
	encodings = linearizeEncodings$1(encodings);

	for (var i = 0; i < encodings.length; i++) {
		encodings[i].options = merge$1(options, encodings[i].options);
		fixOptions$1(encodings[i].options);
	}

	fixOptions$1(options);

	var Renderer = renderProperties.renderer;
	var renderer = new Renderer(renderProperties.element, encodings, options);
	renderer.render();

	if (renderProperties.afterRender) {
		renderProperties.afterRender();
	}
}

// Export to browser
if (typeof window !== "undefined") {
	window.JsBarcode = JsBarcode;
}

// Export to jQuery
/*global jQuery */
if (typeof jQuery !== 'undefined') {
	jQuery.fn.JsBarcode = function (content, options) {
		var elementArray = [];
		jQuery(this).each(function () {
			elementArray.push(this);
		});
		return JsBarcode(elementArray, content, options);
	};
}

var index = {
  props: {
    /*
     * The value of the barcode.
     */
    value: {
      type: String,
      required: true
    },

    /*
     * The options for the barcode generator.
     * {@link https://github.com/lindell/JsBarcode#options}
     */
    options: {
      type: Object
    },

    /*
     * The tag of the component root element.
     */
    tag: {
      type: String,
      default: 'canvas'
    }
  },

  render: function render(createElement) {
    return createElement(this.tag, this.$slots.default);
  },


  watch: {
    /*
     * Update barcode when value change
     */
    value: function value() {
      this.generate();
    },


    /*
     * Update barcode when options change
     */
    options: function options() {
      this.generate();
    }
  },

  mounted: function mounted() {
    this.generate();
  },


  methods: {
    /**
     * Generate barcode
     */
    generate: function generate() {
      JsBarcode(this.$el, this.value, this.options);
    }
  }
};

export default index;
