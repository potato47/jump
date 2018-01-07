import { OverPanel } from "./OverPanel";
import { G } from "../../G";
import { Stage } from "./stage/Stage";
import { PlayerDieEvent } from "../../events/PlayerDieEvent";
import { PlayerJumpSuccessEvent } from "../../events/PlayerJumpSuccessEvent";
import { Player } from "./stage/Player";

const {ccclass, property} = cc._decorator;

@ccclass
export class GameScene extends cc.Component {

    @property(Stage)
    private stage:Stage = null;
    @property(cc.Label)
    private scoreLabel = null;
    private score = 0;
    @property(OverPanel)
    private overPanel:OverPanel = null;
    @property(cc.AudioClip)
    public bgm = null;

    onLoad(){
        if(cc.sys.isMobile) {
            cc.find("Canvas").getComponent(cc.Canvas).fitHeight = false;
            cc.find("Canvas").getComponent(cc.Canvas).fitWidth = true;
        }
    }

    start () {
        this.addListeners();
        this.startGame();
    }

    startGame() {
        this.stage.reset();
        this.stage.enableTouch();
    }

    onPlayerJumpSuccess(event:PlayerJumpSuccessEvent) {
        let score = event.score;
        this.addSocre(score);
        this.stage.updateStage(()=>{
            this.stage.addBlock();
        });
    }

    addSocre(s) {
        this.score+=s;
        this.scoreLabel.string = this.score;
    }

    onOver() {
        this.stage.disableTouch();
        setTimeout(()=> {
            this.overPanel.show(this.score,this.onRestart,this);
        },500);
        cc.log("游戏结束")
    }

    onRestart() {
        this.overPanel.hide();
        cc.director.loadScene("game");
    }

    addListeners() {
        G.on(PlayerDieEvent.NAME,this.onOver,this);
        G.on(PlayerJumpSuccessEvent.NAME,this.onPlayerJumpSuccess,this);
    }

    removeListeners() {
        G.off(PlayerDieEvent.NAME,this.onOver,this);
        G.off(PlayerJumpSuccessEvent.NAME,this.onPlayerJumpSuccess,this);
    }


}
