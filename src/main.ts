import { Stage } from './dom/stage';

/**
 * Main class.
 * @author William Reetz
 * @class Main
 */
class Main {

    public main(): void {
        Stage.getInstance();
    }

}

let main: Main = new Main();
main.main();