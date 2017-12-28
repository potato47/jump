const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Float)
    public jumpDistance:number = 0;

    @property(cc.Integer)
    public power:number = 0;

    public isJumping:boolean = false;

    update(dt) {
        
    } 

}
