class RouterHistory {

    constructor(public history: Array<string>) {
        this.history = history;
    }

    add(path: string) {
        this.history.push(path);
    }

    getPathReversed(index: number): string{
        if(index == 0){
            index = 1;
        }
        return this.history[this.history.length-index];
    }

    getHistory(): Array<string>{
        return this.history;
    }

}
export const routerHistory = new RouterHistory(new Array<string>("/"));
