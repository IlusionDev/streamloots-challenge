export class Analitycs {
    private static instance: Analitycs;

    static getInstance() {
        if (!Analitycs.instance) {
            Analitycs.instance = new Analitycs();
        }
        return Analitycs.instance;
    }

    trackEvent(cardCreated: string, param2: any) {
        //mocked
    }
}
