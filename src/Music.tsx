
import abcjs from 'abcjs'
import defaultAbc from './resources/music.abc'
import { normalize } from 'path';



class ParsedStaff {
  abbrevTitle?: string[];
  title?: string[];
  voices?: Array<Array<abcjs.VoiceItem>>
  clef?: abcjs.ClefProperties;
}

class VoiceData
{
  nm?: string;
  snm?: string;
  clef?: string;
  vid: number;
  bars: string = '';
}

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
    
    let sanitized: string = rawAbc.replace(/\r\n/g, '\n').trim();
     // replace multiple blank lines with a single blank line
    sanitized = sanitized.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    sanitized = sanitized.replace(/\(\s+/g, '('); // remove spaces after (

    // assume only one entry
    const tune: abcjs.TuneObject = abcjs.renderAbc('*', sanitized)[0];
    const lines: abcjs.TuneLine[] = tune.deline();

    // reconstruct the abc text from the parsed object
    // this will ensure consistent formatting
    // and remove any extraneous whitespace or comments
    // that might interfere with rendering or editing
    let normalized: string = '';

    // There is no way to get the original voice id from
    // the parsed object. So, we make a map of staff names
    // to voices, and increment the voice id for each new
    let vid: number = 0;
    let voices: VoiceData[] = [];

    function elementStartsSlur(el: abcjs.VoiceItem) : boolean {
      if (el.el_type === 'note' && el.pitches)
      {
        let n = el as abcjs.VoiceItemNote;
        for (let pitch of n.pitches)
        {
          if (pitch.startSlur)
          {
            return true;
          }
        }
      }
      return false;
    }
  
    for (const line of lines) {
      for (const staff of line.staff) {
        const ps: ParsedStaff = staff;
        
        for (let vi: number = 0; vi < staff.voices.length; vi++) {
          let vm: VoiceData = {
            vid: ++vid, 
            nm: ps.title ? ps.title[vi] : undefined, 
            snm: ps.abbrevTitle ? ps.abbrevTitle[vi] : undefined, 
            clef: ps.clef ? ps.clef.type : undefined,
            bars: ''
          };
          voices.push(vm);
          for (const element of staff.voices[vi]) {
            let el = element as any;
            if (el.startChar !== undefined && el.endChar !== undefined) {
              if (elementStartsSlur(element))
              {
                if (sanitized[el.startChar] !== '(')
                {
                  el.startChar -= 1;
                }
              }
              vm.bars += " " + sanitized.substring(el.startChar, el.endChar);
            }
          }
        }
      }
     
    }
    normalized += `X:1`+"\n";
    if (tune.metaText)
    {
      if (tune.metaText.title)
      {
        normalized += `T:${tune.metaText.title}`+'\n';
      }
      if (tune.metaText.composer)
      {
        normalized += `C:${tune.metaText.composer}`+'\n';
      }
      if (tune.metaText.source)
      {
        normalized += `S:${tune.metaText.source}`+'\n';
      }
      if (tune.metaText.rhythm)
      {
        normalized += `R:${tune.metaText.rhythm}`+'\n';
      }
      if (tune.metaText.tempo)
      {
        normalized += sanitized.substring(tune.metaText.tempo.startChar, tune.metaText.tempo.endChar) + '\n';
      }
    }

    if (tune.getMeterFraction())
    {
      normalized += `M:${tune.getMeterFraction().num}/${tune.getMeterFraction().den}`+'\n';
    }
    if (tune.getBeatLength())
    {
      normalized += `L:1/${1/tune.getBeatLength()}`+'\n';
    }

    let getKeySignatureString = function (k: abcjs.KeySignature) : string {
      let ks: string = "";
      
      if (k)
      {
        ks += `K:${k.root}${k.accidentals}`;
        if (k.mode) {
          ks += ` ${k.mode}`;
        }
      }

      return ks;
    }

    if (tune.getKeySignature())
    {
      normalized += getKeySignatureString(tune.getKeySignature()) + '\n';
    }

    for (const v of voices) {
      if (v.nm || v.snm || v.clef)
      {
        normalized += `V:${v.vid}`;
        if (v.nm) {
          normalized += ` name="${v.nm}"`;
        }
        if (v.snm) {
          normalized += ` snm="${v.snm}"`;
        }
        if (v.clef) {
          normalized += ` clef=${v.clef}`;
        }
        normalized += '\n';
      }
    }

    for (const v of voices)
    {
      normalized += `[V:${v.vid}] `;
      normalized += v.bars + '\n';
    }

    return normalized; // fallback to original if parsing fails
  }

};

export default Music;
