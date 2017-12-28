import { G } from "../G";
import Player from "../components/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property([cc.Prefab])
    private blockList:Array<cc.Prefab> = [];
    @property(Player)
    private player:Player = null;

    private startTouchTime 

    private isRight = true;


    start () {
        this.addListeners();
    }

    startGame() {

    }

    overGame() {

    }

    addListeners() {
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, () => {
            if(this.isRight) {
                this.player.node.runAction(cc.spawn(cc.jumpBy(0.5,cc.v2(200,200),100,1),cc.rotateBy(0.5,360)));
                this.isRight = false;
            }else{
                this.player.node.runAction(cc.spawn(cc.jumpBy(0.5,cc.v2(-200,200),100,1),cc.rotateBy(0.5,-360)));
                this.isRight = true;
            }
        },this);
    }

}
