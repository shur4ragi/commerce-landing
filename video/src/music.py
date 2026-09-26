"""Original lo-fi soundtrack for the Aurora Café presentation (90 BPM, synced to scene cuts)."""
import numpy as np, wave

SR = 44100
BPM = 90
BEAT = 60 / BPM
BAR = 4 * BEAT
DUR = 29 * BAR
N = int(DUR * SR) + SR * 3
rng = np.random.default_rng(42)
L = np.zeros(N); R = np.zeros(N)

def mtof(m): return 440 * 2 ** ((m - 69) / 12)

def add(sig, t0, pan=0.0, gain=1.0):
    i = int(t0 * SR)
    if i >= N: return
    sig = sig[: N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt(0.5 * (1 - pan))
    R[i:i + len(sig)] += sig * np.sqrt(0.5 * (1 + pan))

def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    from scipy.signal import lfilter  # noqa
    return lfilter([1 - a], [1, -a], x)

try:
    import scipy  # noqa
except ImportError:
    import subprocess, sys
    subprocess.run([sys.executable, '-m', 'pip', 'install', '-q', 'scipy'], check=True)
from scipy.signal import lfilter, butter, sosfilt, fftconvolve

def lp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'low', fs=SR, output='sos'), x)
def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)

# ---------- instruments ----------
def rhodes(m, dur, vel=0.5):
    f = mtof(m); n = int((dur + 1.6) * SR); t = np.arange(n) / SR
    env = np.minimum(t / 0.004, 1) * np.exp(-t * 1.1)
    rel = np.clip(1 - (t - dur) / 1.5, 0, 1)
    tine = np.sin(2 * np.pi * f * 4.0 * t) * np.exp(-t * 14) * 0.18 * vel
    body = (np.sin(2 * np.pi * f * t + 0.6 * vel * np.sin(2 * np.pi * f * t) * np.exp(-t * 3))
            + 0.22 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 2.5))
    trem = 1 + 0.12 * np.sin(2 * np.pi * 4.6 * t)
    return (body + tine) * env * rel * trem * vel

def bass(m, dur, vel=0.6):
    f = mtof(m); n = int((dur + 0.3) * SR); t = np.arange(n) / SR
    env = np.minimum(t / 0.012, 1) * np.exp(-t * 0.9) * np.clip(1 - (t - dur) / 0.2, 0, 1)
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t) + 0.08 * np.sin(2 * np.pi * 3 * f * t)
    return lp(s * env * vel, 900)

def kick(vel=1.0):
    n = int(0.5 * SR); t = np.arange(n) / SR
    f = 46 + 90 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 7) * vel + lp(rng.standard_normal(n), 2000) * np.exp(-t * 90) * 0.15 * vel

def snare(vel=0.6):
    n = int(0.35 * SR); t = np.arange(n) / SR
    noise = bp(rng.standard_normal(n), 1200, 6000) * np.exp(-t * 16)
    body = np.sin(2 * np.pi * 185 * t) * np.exp(-t * 22)
    return lp(noise * 0.55 + body * 0.5, 5200) * vel

def hat(vel=0.25, open_=False):
    n = int((0.25 if open_ else 0.06) * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7000) * np.exp(-t * (14 if open_ else 70)) * vel

def pad(ms, dur, vel=0.18):
    n = int(dur * SR); t = np.arange(n) / SR
    s = np.zeros(n)
    for m in ms:
        f = mtof(m)
        for d in (-0.08, 0.0, 0.07):
            s += np.sin(2 * np.pi * f * (1 + d / 100 * 3) * t + rng.random() * 6)
    env = np.minimum(t / 1.2, 1) * np.minimum((dur - t) / 1.2, 1).clip(0, 1)
    return lp(s * env * vel / len(ms), 1800)

def whoosh(dur=1.0, up=True, vel=0.35):
    n = int(dur * SR); t = np.arange(n) / SR; k = t / dur
    x = rng.standard_normal(n)
    env = (np.sin(np.pi * k) ** 2) if up else np.exp(-k * 4) * np.minimum(k / 0.02, 1)
    out = np.zeros(n); lo = 300; hi = 6000
    # sweep a band-pass in blocks
    B = 1024
    for i in range(0, n, B):
        kk = (i + B / 2) / n
        c = lo * (hi / lo) ** (kk if up else 1 - kk)
        seg = x[max(0, i - 256): i + B]
        y = bp(seg, max(c * 0.6, 60), min(c * 1.6, SR / 2 - 100))[-(min(B, n - i)):]
        out[i:i + len(y)] = y
    return out * env * vel

def boom(vel=0.7):
    n = int(2.2 * SR); t = np.arange(n) / SR
    f = 38 + 30 * np.exp(-t * 6)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2) * vel

# ---------- harmony ----------
# IV – iii – ii – I in C (Fmaj9, Em7, Dm9, Cmaj9) — warm and unresolved-then-home.
CHORDS = [
    (41, [57, 60, 64, 67]),  # Fmaj9: A C E G
    (40, [55, 59, 62, 64]),  # Em7:   G B D E
    (38, [53, 57, 60, 64]),  # Dm9:   F A C E
    (36, [52, 55, 59, 62]),  # Cmaj9: E G B D
]
def swing(beat_pos):  # 8th-note swing
    whole, frac = divmod(beat_pos, 1)
    return (whole + (0.58 if abs(frac - 0.5) < 1e-6 else frac)) * BEAT

GROOVE_FROM, GROOVE_TO = 2, 26   # bars with drums
for bar in range(29):
    t0 = bar * BAR
    root, notes = CHORDS[bar % 4]
    final = bar >= 26
    if final:
        root, notes = CHORDS[0] if bar < 28 else CHORDS[3]
    intro = bar < 2
    # rhodes comp: beat 1 and the "and" of 2
    hits = [(0, 1.6, 0.55), (1.5, 2.2, 0.42)] if not (intro or final) else [(0, 3.8, 0.5)]
    for pos, d, v in hits:
        for j, m in enumerate(notes):
            add(rhodes(m, d * BEAT, v * (0.9 + 0.2 * rng.random())), t0 + swing(pos) + j * 0.012, pan=-0.35 + j * 0.23, gain=0.22)
    # pad under everything, louder in intro/outro
    add(pad([m + 12 for m in notes[:3]] + [root + 24], BAR + 0.8, 0.10 if not (intro or final) else 0.2), t0, gain=1.0)
    if bar >= 2 and not final:
        # bass: root on 1, fifth-ish walk on 3.5
        add(bass(root, 1.4 * BEAT, 0.62), t0 + 0.0, gain=0.9)
        add(bass(root + 7, 0.45 * BEAT, 0.45), t0 + swing(2.5), gain=0.9)
        add(bass(root + 12 if bar % 2 else root, 0.9 * BEAT, 0.5), t0 + swing(3.0), gain=0.9)
    if GROOVE_FROM <= bar < GROOVE_TO:
        add(kick(0.95), t0, gain=0.8); add(kick(0.7), t0 + swing(2.5), gain=0.8)
        add(snare(0.55), t0 + BEAT, gain=0.55, pan=0.05); add(snare(0.6), t0 + 3 * BEAT, gain=0.55, pan=0.05)
        for e in range(8):
            add(hat(0.2 if e % 2 else 0.28, open_=(e == 7 and bar % 4 == 3)), t0 + swing(e / 2), pan=0.3, gain=0.5)
    # sparse melody from bar 4 (browser scenes onward)
    if 4 <= bar < 26:
        r = np.random.default_rng(bar)
        tones = sorted(set(m + 12 for m in notes))
        for pos in ([0.5, 1.5, 2.5] if bar % 2 == 0 else [0.0, 2.0, 3.5]):
            m = tones[r.integers(len(tones))] + 0
            if r.random() < 0.85:
                add(rhodes(m, 0.7 * BEAT, 0.35), t0 + swing(pos), pan=0.2, gain=0.24)

# final sustained chord ring
add(pad([60, 64, 67, 71, 74], 6.0, 0.22), 26 * BAR + 2 * BAR)

# ---------- sound design at cuts ----------
S = dict(s2=2 * BAR, s3=4 * BAR, s4=8 * BAR, s5=12 * BAR, s6=17 * BAR, s7=19 * BAR, s8=23 * BAR, s9=26 * BAR)
for k, t in S.items():
    add(whoosh(0.9, True, 0.30), t - 0.72, pan=-0.2)
add(boom(0.55), S['s2'] - 0.02)
add(boom(0.45), S['s9'] + 2.3)
# soft riser into the first cut
n = int(4.6 * SR); tt = np.arange(n) / SR
add(bp(rng.standard_normal(n), 400, 5000) * (tt / 4.6) ** 3 * 0.18, S['s2'] - 4.6)

# ---------- vinyl texture ----------
hiss = lp(hp(rng.standard_normal(N), 800), 7000) * 0.006
crack = np.zeros(N); idx = rng.integers(0, N, 900); crack[idx] = rng.uniform(-1, 1, 900) * 0.12
crack = hp(crack, 1500)
L += hiss + crack; R += np.roll(hiss, 311) + np.roll(crack, 97)

# ---------- reverb ----------
irn = int(2.4 * SR); ti = np.arange(irn) / SR
for ch, seed in ((0, 1), (1, 2)):
    ir = np.random.default_rng(seed).standard_normal(irn) * np.exp(-ti / 0.55)
    ir = lp(ir, 5000); ir /= np.sqrt((ir ** 2).sum())
    src = L if ch == 0 else R
    wet = fftconvolve(src, ir)[:N]
    if ch == 0: L = src + wet * 0.28
    else: R = src + wet * 0.28

# ---------- master ----------
L = lp(L, 11000); R = lp(R, 11000)
end = int(DUR * SR)
fade = np.ones(N); fl = int(2.2 * SR)
fade[end - fl:end] = np.linspace(1, 0, fl) ** 1.5; fade[end:] = 0
fin = int(0.4 * SR); fade[:fin] *= np.linspace(0, 1, fin)
L *= fade; R *= fade
L = L[:end]; R = R[:end]
peak = max(np.abs(L).max(), np.abs(R).max())
g = 0.89 / peak
L = np.tanh(L * g * 1.05) * 0.95; R = np.tanh(R * g * 1.05) * 0.95
pcm = (np.stack([L, R], 1) * 32767).astype(np.int16)
with wave.open('music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('ok', DUR, 's; rms', float(np.sqrt((L ** 2).mean())))
