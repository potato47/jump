import BlockSystem from "./systems/BlockSystem";
import StageSystem from "./systems/StageSystem";
import PlayerSystem from "./systems/PlayerSystem";

export class Global extends cc.EventTarget {
    public blockSystem: BlockSystem = null;
    public stageSystem: StageSystem = null;
    public playerSystem: PlayerSystem = null;

    constructor() {
        super();
        this.blockSystem = new BlockSystem();
        this.stageSystem = new StageSystem();
        this.playerSystem = new PlayerSystem();
    }
}

export const G = new Global();
(window as any).G = G;