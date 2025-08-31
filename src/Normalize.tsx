import abcjs from 'abcjs';

export function normalizeAbc(abcText: string): string {
    const parsed: abcjs.TuneObjectArray = abcjs.parseOnly(abcText);

    const result: string = '';

    return result;
}