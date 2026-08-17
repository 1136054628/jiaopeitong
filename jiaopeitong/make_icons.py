# -*- coding: utf-8 -*-
"""生成「教培通」LOGO 图标（PNG 各尺寸 + 矢量参考）"""
from PIL import Image, ImageDraw
import os

BLUE = (0, 51, 160)      # PANTONE 286 C
WHITE = (255, 255, 255)
BORDER = (214, 224, 240)

def cap_geom(S):
    cx = S / 2
    board = [(cx, S*0.19), (cx+S*0.34, S*0.34), (cx, S*0.50), (cx-S*0.34, S*0.34)]
    skull = [(cx-S*0.17, S*0.33), (cx+S*0.17, S*0.33), (cx+S*0.135, S*0.69), (cx-S*0.135, S*0.69)]
    ta = (cx+S*0.34, S*0.34)
    tb = (cx+S*0.34, S*0.60)
    td = (cx+S*0.34, S*0.66)
    return board, skull, ta, tb, td

def draw_cap(d, S, color):
    board, skull, ta, tb, td = cap_geom(S)
    d.polygon(skull, fill=color)
    d.polygon(board, fill=color)
    d.line([ta, tb], fill=color, width=max(2, int(S*0.016)))
    r = max(3, int(S*0.028))
    d.ellipse([td[0]-r, td[1]-r, td[0]+r, td[1]+r], fill=color)

def make_any(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([1, 1, size-1, size-1], radius=int(size*0.225), fill=WHITE)
    d.rounded_rectangle([1, 1, size-1, size-1], radius=int(size*0.225), outline=BORDER, width=max(1, int(size*0.006)))
    draw_cap(d, size, BLUE)
    return img

def make_apple(size):
    img = Image.new('RGB', (size, size), WHITE)
    d = ImageDraw.Draw(img)
    draw_cap(d, size, BLUE)
    return img

def make_maskable(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size, size], radius=int(size*0.20), fill=BLUE)
    draw_cap(d, size, WHITE)
    return img

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'icons')
os.makedirs(out, exist_ok=True)

master = make_any(512)
master.save(os.path.join(out, 'icon-512.png'))
master.resize((192, 192), Image.LANCZOS).save(os.path.join(out, 'icon-192.png'))
master.resize((64, 64), Image.LANCZOS).save(os.path.join(out, 'icon-64.png'))
master.resize((32, 32), Image.LANCZOS).save(os.path.join(out, 'icon-32.png'))
make_apple(180).save(os.path.join(out, 'icon-180.png'))

mm = make_maskable(512)
mm.save(os.path.join(out, 'icon-maskable-512.png'))
mm.resize((192, 192), Image.LANCZOS).save(os.path.join(out, 'icon-maskable-192.png'))

print('icons generated OK ->', os.path.abspath(out))
