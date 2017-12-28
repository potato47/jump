import { G } from "../G";
import Player from "../components/Player";
import Stage from "../components/Stage";
import Block from "../components/Block";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(Block)
    private firstBlock: Block = null;
    @property([cc.Prefab])
    private blockList:Array<cc.Prefab> = [];
    @property(Player)
    private player:Player = null;
    @property(Stage)
    private stage:Stage = null;
    @property(cc.Label)
    private scoreLabel = null;
    private score = 0;
    @property(cc.Node)
    private overPanel: cc.Node = null;
    @property(cc.Label)
    private overMessage: cc.Label = null;

    start () {
        G.gameScene = this;
        G.stageSystem.init(this.player,this.stage,this.firstBlock);
        G.playerSystem.init(this.player);
        G.blockSystem.init(this.firstBlock,this.blockList,this.stage,this.player);
        this.addListeners();
        this.startGame();
    }

    startGame() {
        G.blockSystem.addBlock();
    }

    addSocre() {
        this.score ++;
        this.scoreLabel.string = this.score;
    }

    overGame() {
        this.removeListeners();
        setTimeout(()=> {
            this.overPanel.active = true;
            this.overMessage.string = this.score+"";
        },500);
        cc.log("游戏结束")
    }

    restartGame() {
        cc.director.loadScene("game");
    }

    addListeners() {
        let canvas = cc.find("Canvas");
        canvas.on(cc.Node.EventType.TOUCH_START, () => {
            G.playerSystem.readyJump();
        },this);
        canvas.on(cc.Node.EventType.TOUCH_END,()=> {
            G.playerSystem.jump();
        },this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    removeListeners() {
        cc.find("Canvas").targetOff(this);
        cc.systemEvent.targetOff(this);
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.KEY.space:
                G.playerSystem.readyJump();
                break;
        }
    }

    onKeyUp(event) {
        switch(event.keyCode) {
            case cc.KEY.space:
            G.playerSystem.jump();
                break;
        }
    }

    update(dt) {
        G.playerSystem.update(dt);
        G.blockSystem.update(dt);
    }

}
