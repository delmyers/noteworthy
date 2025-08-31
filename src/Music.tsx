
import abcjs, { TuneObject } from 'abcjs'
import defaultAbc from './resources/music.abc'
export class Music
{
  private _abcText = '';
  private static _instance: Music | null = null;

  public get abc(): string {
    return this._abcText;
  }

  public static get Instance(): Music {
    if (this._instance === null) {
      this._instance = Music.LoadDefault();
    }
    return this._instance;
  }

  private constructor(abc: string) {
    this._abcText = abc;
  }

  private static LoadDefault(): Music {
    return new Music(Music.normalizeMusic(defaultAbc));
  }

  private static normalizeMusic(rawAbc: string) : string
  {
    
    // assume only one entry
    const tune: abcjs.TuneObject = abcjs.parseOnly(rawAbc)[0];

    return rawAbc;
  }

};

export default Music;
