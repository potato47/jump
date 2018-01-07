export class PlayerDieEvent extends cc.Event.EventCustom {
    public static readonly NAME = "PlayerDie";

    public constructor() {
        super(PlayerDieEvent.NAME,true);
    }
    
}