"""Builds clips.json (frame timestamps + marks) from the recordings in rec/."""
import json
out = {}
for n in ['intro', 'scroll', 'order', 'mobile']:
    d = json.load(open(f'rec/{n}/index.json')); f = d['frames']; t0 = f[0]['t']
    out[n] = {'t': [round(x['t'] - t0, 4) for x in f], 'marks': {k: round(v - t0, 3) for k, v in d['marks'].items()}}
open('clips.json', 'w').write(json.dumps(out))
