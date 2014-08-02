class Rule {
    private rule: string;
    private pattern: RegExp;
    private register: Array<string> = [];
    capture: { [key: string]: string } = {};

    constructor(rule: string);
    constructor(rule: RegExp);
    constructor(rule: any) {
        if (typeof rule == "string" || rule instanceof String) {
            this.rule = rule;
        } 
        if (rule instanceof RegExp) {
            this.pattern = rule;
        }
    }

    compile(): RegExp {
        if (this.pattern) {
            return this.pattern;
        }
        var rule = this.rule,
            before = rule;
        rule = rule.replace(/\/:([^\/]+)/, "/([^/]+)");
        while (rule != before) {
            this.register.push(RegExp.$1);
            before = rule;
            rule = rule.replace(/\/:([^\/]+)/, "/([^/]+)");
        }
        this.pattern = new RegExp("^" + rule);
        return this.pattern;
    }

    test(path: string): boolean {
        var match = this.compile().exec(path);
        if (match == null) {
            return false;
        }
        for (var i = 0, len = this.register.length; i < len; i++) {
            this.capture[this.register[i]] = match[i + 1];
        }
        return true;
    }
}

export = Rule
