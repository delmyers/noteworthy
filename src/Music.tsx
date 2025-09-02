
import abcjs, { TuneObject, TuneLine } from 'abcjs'
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
    const tune: TuneObject = abcjs.parseOnly(rawAbc)[0];
    const lines: TuneLine[] = tune.deline();

    // reconstruct the abc text from the parsed object
    // this will ensure consistent formatting
    // and remove any extraneous whitespace or comments
    // that might interfere with rendering or editing
    let normalized: string = '';
    
    for (const line of lines) {
      for (const staff of line.staff) {

        }
      }
     
      return rawAbc; // fallback to original if parsing fails
    }

};

export default Music;
