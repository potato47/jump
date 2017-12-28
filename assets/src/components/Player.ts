import { G } from "../G";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Float)
    public jumpDistance: number = 0;

    @property(cc.Integer)
    public power: number = 0;

    public speed: number = 0;

    public isReadyJump: boolean = false;

    public direction: number = 1;

}
