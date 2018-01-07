import { G } from "../../../G";


const { ccclass, property } = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property(cc.Float)
    public jumpDistance: number = 0;

    @property(cc.Integer)
    public power: number = 0;
    @property(cc.Float)
    public initSpeed: number = 0;

    public speed: number = 0;

    public isReadyJump: boolean = false;

    public direction: number = 1;

    @property(cc.AudioClip)
    private readyJumpAudio = null;
    private readyJumpAudioId = -1;
    @property(cc.AudioClip)
    private jumpAudio = null;
    private jumpAudioId = -1;

    onLoad() {
        cc.find("title",this.node).active = false;
    }

    public readyJump() {
        this.readyJumpAudioId =  cc.audioEngine.play(this.readyJumpAudio,false,1);
        cc.find("title",this.node).active = true;
        cc.find("rotateAnchor/sprite",this.node).runAction(cc.scaleTo(2,1,0.5));
        this.speed = this.initSpeed;
        this.isReadyJump = true;
    }

    public jumpTo(worldPos:cc.Vec2,cb:Function,cbTarget?:any) {
        cc.audioEngine.stop(this.readyJumpAudioId);
        this.jumpAudioId = cc.audioEngine.play(this.jumpAudio,false,1);
        cc.find("rotateAnchor/sprite",this.node).stopAllActions();
        cc.find("title",this.node).active = false;
        let targetPos = this.node.parent.convertToNodeSpaceAR(worldPos)
        this.node.color = cc.Color.WHITE;
        this.isReadyJump = false;
        let resetAction = cc.scaleTo(1,1,1);
        let jumpAction = cc.jumpTo(0.5,targetPos,200,1);
        let rotateAction = cc.rotateBy(0.5,this.direction*360);
        let finished = cc.callFunc(()=>{
            this.direction = Math.random()>0.5?1:-1;
            this.speed = 0;
            this.jumpDistance = 0;
            cb();
        },cbTarget);
        cc.find("rotateAnchor/sprite",this.node).runAction(resetAction);
        cc.find("rotateAnchor",this.node).runAction(rotateAction);
        this.node.runAction(cc.sequence(jumpAction,finished))
        
    }

    public update(dt) {
        if(this.isReadyJump) {
            this.speed += dt * this.power;
            this.jumpDistance += this.speed * dt;
        }
    }

}
