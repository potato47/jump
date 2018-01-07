const { ccclass, property } = cc._decorator;

@ccclass
export class OverPanel extends cc.Component {

    @property(cc.Label)
    private messageLabel: cc.Label = null;
    @property(cc.Node)
    private restartButton: cc.Node = null;

    public show(score: number,cb,target?:any) {
        this.node.active = true;
        this.messageLabel.string = score + "";
        this.restartButton.once(cc.Node.EventType.TOUCH_END,cb,target);
    }

    public hide() {
        this.node.active = false;
    }
}