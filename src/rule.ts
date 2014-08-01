class Rule {
    constructor(private rule: string) { }

    test(path: string): boolean {
        return new RegExp("^" + this.rule).test(path);
    }
}

export = Rule
