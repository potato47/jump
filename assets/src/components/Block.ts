const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    @property(cc.Float)
    private maxScale: number = 0;
    @property(cc.Float)
    private minScale: number = 0;
    @property(cc.Float)
    private minDistance: number = 0;
    @property(cc.Float)
    private maxDistance: number = 0;

    start() {

    }

}
