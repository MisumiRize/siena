class Rule {
    private register: Array<string> = [];
    capture: { [key: string]: string } = {};

    constructor(private rule: string) { }

    compile(): RegExp {
        var rule = this.rule,
            before = rule;
        rule = rule.replace(/\/:([^\/]+)/, "/([^/]+)");
        while (rule != before) {
            this.register.push(RegExp.$1);
            before = rule;
            rule = rule.replace(/\/:([^\/]+)/, "/([^/]+)");
        }
        return new RegExp("^" + rule);
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
