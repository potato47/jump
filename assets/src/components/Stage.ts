const {ccclass, property} = cc._decorator;

@ccclass
export default class Stage extends cc.Component {

    @property(cc.Vec2)
    public leftOrigin:cc.Vec2 = cc.v2();
    @property(cc.Vec2)
    public rightOrigin:cc.Vec2 = cc.v2();
    @property(cc.Node)
    public blockLayer:cc.Node = null;


}
