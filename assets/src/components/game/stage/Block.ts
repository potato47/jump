const { ccclass, property } = cc._decorator;

@ccclass
export class Block extends cc.Component {

    @property(cc.Float)
    public maxScale: number = 0;
    @property(cc.Float)
    public minScale: number = 0;
    @property(cc.Float)
    public minDistance: number = 0;
    @property(cc.Float)
    public maxDistance: number = 0;
    @property(cc.Float)
    public anchorOffset: number = 0;
    @property(cc.Integer)
    public score: number = 1;

    @property([cc.Node])
    private rightAnchorList: Array<cc.Node> = [];
    @property([cc.Node])
    private leftAnchorList: Array<cc.Node> = [];
    @property(cc.Node)
    private centerAnchor: cc.Node = null;

    @property(cc.Node)
    private p1:cc.Node = null;
    @property(cc.Node)
    private p2:cc.Node = null;

    public getCenterPosition():cc.Vec2 {
        return this.centerAnchor.parent.convertToWorldSpaceAR(this.centerAnchor.position);
    }

    public getAnchorLocation(worldPos:cc.Vec2,direction:number):cc.Vec2 {
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        let anchorList = direction>0?this.rightAnchorList:this.leftAnchorList
        let nearAnchor = anchorList[0];
        for(let i = 1;i < anchorList.length;i++) {
            if(cc.pDistance(anchorList[i].position,localPos) < cc.pDistance(nearAnchor.position,localPos)){
                nearAnchor = anchorList[i];
            }
        }
        if(cc.pDistance(nearAnchor.position,localPos)<=this.anchorOffset) {
            return nearAnchor.parent.convertToWorldSpaceAR(nearAnchor.position);
        }else{
            return null;
        }
    }

    public getLeftTan():number { 
        return this.p1.y/(-this.p1.x);
    }

    public getRightTan():number {
        cc.log(this.p2.y/this.p2.x);        
        return this.p2.y/this.p2.x;
    }

    public playScoreAnim() {
        cc.find("score",this.node).getComponent(cc.Label).string = "+"+this.score;
        cc.find("score",this.node).getComponent(cc.Animation).play();
    }

    // public shrink() {
    //     // cc.find("sprite",this.node).runAction(cc.scaleTo(2,1,0.5));
    //     this.node.runAction(cc.scaleTo(2,1,0.5));
    // }

    // public stopShrink() {
    //     // cc.find("sprite",this.node).stopAllActions();
    //     this.node.stopAllActions();
    // }

    // public enlarge() {
    //     cc.find("sprite",this.node).runAction(cc.scaleTo(1,1,1));
    //     this.node.runAction(cc.scaleTo(1,1,1));
    // }

}
