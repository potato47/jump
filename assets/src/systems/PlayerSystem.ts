import Player from "../components/Player";
import { G } from "../G";

export default class PlayerSystem{
    private player:Player = null;

    public init(player:Player) {
        this.player = player;
    }

    public readyJump() {
        this.player.isReadyJump = true;
        this.player.node.color = cc.Color.RED;
    }

    public jump() {
        this.player.node.color = cc.Color.WHITE;
        this.player.isReadyJump = false;
        let jumpAction = cc.jumpBy(0.5,cc.v2(this.player.direction*this.player.jumpDistance,this.player.jumpDistance),200,1);
        let rotateAction = cc.rotateBy(0.5,this.player.direction*360);
        let finished = cc.callFunc((target) => {
            if(G.blockSystem.checkOver()) {
                G.gameScene.overGame();
            }else {
                G.gameScene.addSocre();
                G.stageSystem.updateStage();
            }
        }, this);
        let action = cc.sequence(jumpAction,finished);
        this.player.node.runAction(action);
        // this.player.direction = -this.player.direction;
        this.player.direction = Math.random()>0.5?1:-1;
        this.player.speed = 0;
        this.player.jumpDistance = 0;
    }



    public update(dt) {
        if(this.player.isReadyJump) {
            this.player.speed += dt * this.player.power;
            this.player.jumpDistance += this.player.speed * dt;
        }
    }

}
