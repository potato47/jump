export class PlayerJumpSuccessEvent extends cc.Event.EventCustom {
    public static readonly NAME:string = "PlayerJumpSuccess";
    public score: number
    public constructor(score:number) {
        super(PlayerJumpSuccessEvent.NAME,true);
        this.score = score;
    }
}