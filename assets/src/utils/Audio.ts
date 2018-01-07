export class Audio {
    private bgmVolume = 1.0;
    private sfxVolume = 1.0;
    private bgmAudioID = -1;
    private playing = "";

    public constructor() {
        let t = cc.sys.localStorage.getItem("bgmVolume");
        if (t !== null || t !== undefined) {
            this.bgmVolume = parseFloat(t);
        }
        t = cc.sys.localStorage.getItem("sfxVolume");
        if (t !== null || t !== undefined) {
            this.sfxVolume = parseFloat(t);
        }
        cc.game.on(cc.game.EVENT_HIDE, function () {
            console.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            console.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    }
    getUrl(url): string {
        return cc.url.raw("resources/sounds/" + url);
    }
    playBGM(url) {
        this.playing = url;
        var audioUrl = this.getUrl(url);
        console.log(audioUrl);
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
        this.bgmAudioID = cc.audioEngine.play(audioUrl, true, this.bgmVolume);
    }
    playSFX(url: string) {
        var audioUrl = this.getUrl(url);
        if (this.sfxVolume > 0) {
            var audioId = cc.audioEngine.play(audioUrl, false, this.sfxVolume);
        }
    }
    setSFXVolume(v: number) {
        if (this.sfxVolume !== v) {
            // cc.sys.localStorage.setItem("sfxVolume",v);
            this.sfxVolume = v;
        }
    }
    public setBGMVolume(v: number, force: boolean) {
        if (this.bgmAudioID >= 0) {
            if (v > 0) {
                cc.audioEngine.resume(this.bgmAudioID);
            } else {
                cc.audioEngine.pause(this.bgmAudioID);
            }
            //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }
        if (this.bgmVolume !== v || force) {
            // cc.sys.localStorage.setItem("bgmVolume",v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID, v);
        }
    }
    public pauseAll() {
        cc.audioEngine.pauseAll();
    }
    public resumeAll() {
        cc.audioEngine.resumeAll();
    }
    public save() {
        cc.sys.localStorage.setItem("sfxVolume", this.sfxVolume);
        cc.sys.localStorage.setItem("bgmVolume", this.bgmVolume);
    }
}