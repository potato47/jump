import Player from "../components/Player";
import Stage from "../components/Stage";
import Block from "../components/Block";
import { G } from "../G";

export default class StageSystem {

    private player: Player = null;
    private stage :Stage = null;

    init(player:Player,stage: Stage,firstBlock:Block) {
        this.player = player;
        this.stage = stage;
        let pos = this.player.node.parent.convertToNodeSpaceAR(this.stage.leftOrigin);
        this.player.node.position = pos;
        firstBlock.node.position = pos;
    }

    updateStage() {
        let moveVector;
        let playerWorldPos = this.player.node.parent.convertToWorldSpaceAR(this.player.node.position);
        if(this.player.direction > 0) {
            moveVector = cc.pSub(playerWorldPos,this.stage.leftOrigin);
        }else {
            moveVector = cc.pSub(playerWorldPos,this.stage.rightOrigin);
        }
        let finished = cc.callFunc((target) => {
            G.blockSystem.addBlock();
        }, this);
        let action = cc.sequence(cc.moveTo(0.5,cc.pSub(this.stage.node.position,moveVector)),finished);
        this.stage.node.runAction(action);
    }

    addBlock() {

    }

}
