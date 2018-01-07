import { G } from "../../G";

const {ccclass, property} = cc._decorator;

@ccclass
export class MenuScene extends cc.Component {

    @property(cc.Node)
    private startButton:cc.Node = null;
    @property(cc.PageView)
    private selectPage:cc.PageView = null;

    onLoad() {
        if(cc.sys.isMobile) {
            cc.find("Canvas").getComponent(cc.Canvas).fitHeight = false;
            cc.find("Canvas").getComponent(cc.Canvas).fitWidth = true;
        }
    }

    start() {
        this.addListeners();
    }

    onBtnStart() {
        cc.find("Canvas/mask").active = true;
        let n = this.selectPage.getCurrentPageIndex();
        G.startGame(n);
    }

    addListeners() {
        this.startButton.on(cc.Node.EventType.TOUCH_END,this.onBtnStart,this);
    }

}
