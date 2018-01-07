import { GameScene } from "./components/game/GameScene";

export class Global extends cc.EventTarget {
    public static readonly Instance:Global = new Global();

    private constructor() {
        super();
    }

    public startGame(selectedPlayer:number) {
        cc.director.loadScene("game",(err,scene)=>{
            if(!err) {
                let gameScene:GameScene = scene.getChildByName("Canvas").getComponent(GameScene);
                cc.audioEngine.play(gameScene.bgm,true,1);
            }
        });
    }

}

export const G = Global.Instance;