const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    @property(cc.Float)
    public maxScale: number = 0;
    @property(cc.Float)
    public minScale: number = 0;
    @property(cc.Float)
    public minDistance: number = 0;
    @property(cc.Float)
    public maxDistance: number = 0;

    start() {

    }

}
