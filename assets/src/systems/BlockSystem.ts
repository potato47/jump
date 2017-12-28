import Stage from "../components/Stage";
import Player from "../components/Player";
import Block from "../components/Block";

export default class BlockSystem {

    private blockList: Array<cc.Prefab> = [];
    private stage: Stage = null;
    private player: Player = null;

    private currBlock: Block = null;

    public init(firstBlock: Block, blockList: Array<cc.Prefab>, stage: Stage, player: Player) {
        this.currBlock = firstBlock;
        this.blockList = blockList;
        this.stage = stage;
        this.player = player;
    }

    public addBlock() {
        let n = Math.floor(Math.random() * this.blockList.length);
        let blockNode = cc.instantiate(this.blockList[n]);
        let block = blockNode.getComponent(Block);
        let scale = block.minScale + Math.random() * (block.maxScale - block.minScale);
        let distance = block.minDistance + Math.random() * (block.maxDistance - block.minDistance);
        blockNode.scale = scale;
        if (this.player.direction > 0) {
            blockNode.x = this.currBlock.node.x + distance;
            blockNode.y = this.currBlock.node.y + distance;
        } else {
            blockNode.x = this.currBlock.node.x - distance;
            blockNode.y = this.currBlock.node.y + distance;
        }
        this.stage.blockLayer.addChild(blockNode);
        this.currBlock = block;
    }

    public removeBlock() {

    }

    public checkOver(): boolean {
        return cc.pDistance(this.player.node.position, this.currBlock.node.position) > this.currBlock.node.width / 2 * this.currBlock.node.scale;
    }

    public update(dt) {

    }
}
