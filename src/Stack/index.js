/**
 * 栈
 *
 * 是限定仅在表尾进行插入或删除操作的线性表。表尾为栈顶（top），表头为栈底（bottom），不含元素的空表为空栈。
 * 栈又称为后进先出（last in first out）的线性表。
 */

/**
 * 顺序栈
 * 栈的顺序存储结构是利用一组地址连续的存储单元依次存放至栈底到栈顶的元素，同时附设指针top指示栈顶元素在顺序栈中的位置。
 *
 */

// 栈的链式表示
export default class Stack {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    get size(){
        return this.length;
    }

    isEmpty(){
        return this.length === 0;
    }
    push (data) {
        let node = {
            data: data,
            next: null
        };

        node.next = this.top;
        this.top = node;
        this.length++;
    }
    peek () {
        return this.top === null ?
            null :
            this.top.data;
    }
    pop () {
        if (this.top === null) return null;

        let out = this.top;
        this.top = this.top.next;

        if (this.length > 0) this.length--;
        

        return out.data;
    }
    clear () {
        this.top = null;
        this.length = 0;
    }
    toString () {
        if (this.top === null) return null;

        let arr = [];
        let current = this.top;

        for (let i = 0, len = this.size; i < len; i++) {
            arr[i] = current.data;
            current = current.next;
        }

        return arr;
    }
}

let stack = new Stack();

stack.push(1);
stack.push('asd');

stack.pop();
stack.push({a: 1});
console.log(stack);

/**
 * 这里用字符串train表示火车，H表示硬席，S表示软席
 * @param {String} train
 */
function trainArrange(train){
    let stack = new Stack();
    let q = [];
    let i = 0;
    let j = 0;

    while(train[i]){
        if(train[i] === 'H') stack.push(train[i]);
        else q[j++] = train[i];
        i++;
    }

    while(stack.length){
        let c = stack.pop();
        q[j++] = c;
    }

    return q + '';
}

console.log('trainArrange: ' + trainArrange('HSSHSSSHHHHHS'));  // trainArrange: S,S,S,S,S,S,H,H,H,H,H,H,H


// 判断字符串中“&”前和“&”后部分是否为逆串，"@"表示结束符，是则返回true，否则返回false
function isReverse(str){
    let stack = new Stack();
    let i = 0;

    while(str[i] !== '&'){
        if(str[i] === '@') return false;
        stack.push(str[i]);
        i++;
    }

    i++;

    while(str[i] !== '@') {
        if(!stack.length) return false;

        let s = stack.pop();
        if(s !== str[i]) return false;
        i++;
    }

    return !stack.length;
}

console.log('isReverse: ' + isReverse('abcd&dcba@a'));  // true


// 数值进制转换
// 公式： N = (N / d) * d + N % d
// N：十进制数值， d：需要转换的进制数
function numTransform(number, rad) {
    let s = new Stack();

    while (number) {
        s.push(number % rad);
        number = parseInt(number / rad, 10);
    }

    let arr = [];
    while (s.top) {
        arr.push(s.pop());
    }
    console.log(arr.join(''));
}

numTransform(1348, 8);
numTransform(1348, 2);


// 括号匹配检查
function bracketsMatch(str) {
    let stack = new Stack();
    let text = '';

    for (let i = 0, len = str.length; i < len; i++) {
        let c = str[i];
        if (c === '[') {
            stack.push(c);
        } else if (c === ']') {
            if (!stack.length || stack.pop() !== '[') throw new Error('unexpected brackets:' + c);
        } else {
            text += c;
        }
    }
    console.log(text);
}

console.log(bracketsMatch('[asd]'));

function Matcher(left, right) {
    this.left = left;
    this.right = right;
    this.stack = new Stack();
}
Matcher.prototype = {
    match: function (str) {
        let text = '';

        for (let i = 0, len = str.length; i < len; i++) {
            let c = str[i];
            if (c === this.left) {
                this.stack.push(c);
            } else if (c === this.right) {
                if (!this.stack.length || this.stack.pop() !== this.left) {
                    throw new Error('unexpected brackets:' + c);
                } else {
                    text += ',';
                }
            } else {
                text += c;
            }
        }
        console.log(text);
        return text;
    }
};
let m = new Matcher('{', '}');
m.match('[{123}123');

function LineEditor(str) {
    this.stack = new Stack();
    this.str = str || '';
}
LineEditor.prototype = {
    getResult: function () {
        let stack = this.stack;
        let str = this.str;
        for (let i = 0, len = str.length; i < len; i++) {
            let c = str[i];
            switch (c) {
                case '#':
                    stack.pop();
                    break;
                case '@':
                    stack.clear();
                    break;
                default:
                    stack.push(c);
                    break;
            }
        }

        let result = '';
        let current = stack.length;
        while (current) {
            result = current.data + result;
            current = current.next;
        }

        return result;
    }
};

let le = new LineEditor('whli##ilr#e(s#*s)\
    \noutcha@putchar(*s=#++)');
console.log(le.getResult());


let prioty = {
    "+": 1,
    "-": 1,
    "%": 2,
    "*": 2,
    "/": 2,
    "^": 3,
    "(": 0,
    ")": 0,
    "`": -1
};

function doop(op, opn1, opn2) {
    switch (op) {
        case "+":
            return opn1 + opn2;
        case "-":
            return opn1 - opn2;
        case "*":
            return opn1 * opn2;
        case "/":
            return opn1 / opn2;
        case "%":
            return opn1 % opn2;
        case "^":
            return Math.pow(opn1, opn2);
        default:
            return 0;
    }
}

function opcomp(a, b) {
    return prioty[a] - prioty[b];
}

function calInfixExpression(exp) {
    let cs = [];
    let ns = [];
    exp = exp.replace(/\s/g, "");
    exp += '`';
    if (exp[0] === '-') {
        exp = "0" + exp;
    }
    let c;
    let op;
    let opn1;
    let opn2;
    for (let i = 0; i < exp.length; ++i) {
        c = exp[i];
        // 如果是操作符
        if (c in prioty) {
            // 如果右边不是左括号且操作符栈的栈顶元素优先权比右边大
            // 循环遍历进行连续运算
            while (c != '(' && cs.length && opcomp(cs[cs.length - 1], c) >= 0) {
                // 出栈的操作符
                op = cs.pop();
                // 如果不是左括号或者右括号，说明是运算符
                if (op != '(' && op != ')') {
                    // 出栈保存数字的栈的两个元素
                    opn2 = ns.pop();
                    opn1 = ns.pop();
                    // 将与操作符运算后的结果保存到栈顶
                    ns.push(doop(op, opn1, opn2));
                }
            }
            // 如果右边不是右括号，保存到操作符栈中
            if (c != ')') cs.push(c);
        } else {
            // 多位数的数字的情况
            while (!(exp[i] in prioty)) {
                i++;
                c += exp[i];
            }
            ns.push(parseFloat(c));
            i--;
        }
    }
    return ns.length ? ns[0] : NaN;
}

let exp1 = calInfixExpression('5+3*4/2-2^3+5%2');
console.log(exp1);
