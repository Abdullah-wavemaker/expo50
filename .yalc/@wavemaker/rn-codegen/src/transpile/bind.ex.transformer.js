"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORMAT_CONTEXT = void 0;
const compiler_1 = require("@angular/compiler");
const lodash_1 = require("lodash");
const STR_ESCAPE_REGEX = /[^ a-zA-Z0-9]/g;
exports.FORMAT_CONTEXT = "{formatContext:''}";
const stringEscapeFn = (str) => {
    return '\\u' + ('0000' + str.charCodeAt(0).toString(16)).slice(-4);
};
class ExpressionTransformer {
    constructor(ctx = 'this', mode = 'attr') {
        this.ctx = ctx;
        this.mode = mode;
    }
    processImplicitReceiver(ast) {
        return this.ctx;
    }
    processLiteralPrimitive(ast) {
        return (0, lodash_1.isString)(ast.value) ? `"${ast.value.replace(/"/g, '\"')}"` : ast.value;
    }
    processLiteralArray(ast) {
        const s = [];
        for (const item of ast.expressions) {
            s.push(this.build(item));
        }
        return `[${s.join(',')}]`;
    }
    processLiteralMap(ast) {
        const _values = [];
        for (const _value of ast.values) {
            _values.push(this.build(_value));
        }
        return (`{${ast.keys.map((k, i) => `'${k.key}':${_values[i]}`)}}`);
    }
    processPropertyRead(ast) {
        const r = this.build(ast.receiver);
        return `${r}.${ast.name}`;
    }
    processKeyedRead(ast) {
        const k = this.build(ast.key);
        const o = this.build(ast.receiver);
        return `${o}[${k}]`;
    }
    processPrefixNot(ast) {
        const r = this.build(ast.expression);
        return `!(${r})`;
    }
    processBinary(ast) {
        const l = this.build(ast.left);
        const r = this.build(ast.right);
        return `(${l}${ast.operation}${r})`;
    }
    processConditional(ast) {
        const condition = this.build(ast.condition);
        const trueExp = this.build(ast.trueExp);
        const falseExp = this.build(ast.falseExp);
        return `(${condition}?${trueExp}:${falseExp})`;
    }
    processChain(ast) {
        return ast.expressions.map(e => this.build(e)).join(';');
    }
    processPropertyWrite(ast) {
        let receiver, lhs;
        if (ast.receiver instanceof compiler_1.ImplicitReceiver) {
            lhs = `${this.ctx}.${ast.name}`;
        }
        else {
            receiver = this.build(ast.receiver);
            lhs = `${receiver}${receiver.length ? '.' : ''}${ast.name}`;
        }
        const rhs = this.build(ast.value);
        return `${lhs} = ${rhs}`;
    }
    processMethodCall(ast) {
        const _args = [];
        for (const arg of ast.args) {
            let argExp = this.build(arg);
            if (this.mode === 'event') {
                argExp = argExp.replace(`${this.ctx}.`, '');
            }
            _args.push(argExp);
        }
        const fn = this.build(ast.receiver);
        return `${fn}.${ast.name}(${_args.join(',')})`;
    }
    processPipe(ast) {
        let name = ast.name;
        const _args = [];
        const exp = this.build(ast.exp);
        for (const arg of ast.args) {
            _args.push(this.build(arg));
        }
        if (_args[0] && name === 'custom') {
            name = `custom.${_args[0]}`.replace(/"/g, '');
            _args.shift();
        }
        _args.unshift(exp);
        return `${this.ctx}.formatters.get('${name}').format(${_args}, ${exports.FORMAT_CONTEXT})`;
    }
    build(ast) {
        if (ast instanceof compiler_1.ImplicitReceiver) {
            return this.processImplicitReceiver(ast);
        }
        else if (ast instanceof compiler_1.LiteralPrimitive) {
            return this.processLiteralPrimitive(ast);
        }
        else if (ast instanceof compiler_1.LiteralArray) {
            return this.processLiteralArray(ast);
        }
        else if (ast instanceof compiler_1.LiteralMap) {
            return this.processLiteralMap(ast);
        }
        else if (ast instanceof compiler_1.PropertyRead) {
            return this.processPropertyRead(ast);
        }
        else if (ast instanceof compiler_1.PropertyWrite) {
            return this.processPropertyWrite(ast);
        }
        else if (ast instanceof compiler_1.KeyedRead) {
            return this.processKeyedRead(ast);
        }
        else if (ast instanceof compiler_1.PrefixNot) {
            return this.processPrefixNot(ast);
        }
        else if (ast instanceof compiler_1.Binary) {
            return this.processBinary(ast);
        }
        else if (ast instanceof compiler_1.Conditional) {
            return this.processConditional(ast);
        }
        else if (ast instanceof compiler_1.MethodCall) {
            return this.processMethodCall(ast);
        }
        else if (ast instanceof compiler_1.Chain) {
            return this.processChain(ast);
        }
        else if (ast instanceof compiler_1.BindingPipe) {
            return this.processPipe(ast);
        }
        return '';
    }
}
const transform = (expr, scopeName = 'this', mode = 'attr') => {
    expr = expr && expr.trim();
    if (!expr || !expr.length) {
        return '';
    }
    try {
        const parser = new compiler_1.Parser(new compiler_1.Lexer);
        let expressions = expr.split(';'), transformedExpressions = [];
        const $iExp = new RegExp('\\[' + scopeName + '\\.\\$i\\]', 'g');
        expressions.forEach((currentExp) => {
            const ast = parser.parseBinding(currentExp, '', 0);
            let exp = new ExpressionTransformer(scopeName, mode).build(ast.ast);
            if (typeof exp === 'string') {
                exp = exp.replace($iExp, '[0]');
            }
            transformedExpressions.push(exp);
        });
        return transformedExpressions.join(';');
    }
    catch (e) {
        console.error(`failed to parse ${expr}`);
        throw new Error(e);
    }
};
exports.default = transform;
(() => {
    const i = `Variables.callme($event)`;
    const s = transform(i);
    console.log(i + ' : \n ' + s);
});
//# sourceMappingURL=bind.ex.transformer.js.map