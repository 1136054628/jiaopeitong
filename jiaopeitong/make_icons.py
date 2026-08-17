# -*- coding: utf-8 -*-
"""生成「教培通」LOGO 图标（PNG 各尺寸 + 矢量参考）
配色：蓝色背景（PANTONE 286 C）+ 白色博士帽
"""
from PIL import Image, ImageDraw
import os

BLUE = (0, 51, 160)      # PANTONE 286 C
WHITE = (255, 255, 255)

def cap_geom(S, scale=1.0):
    cx = S / 2
    cy = S / 2
    m = scale
    board = [
        (cx,             cy - S*0.31*m),   # 帽板·顶
        (cx + S*0.34*m,  cy - S*0.16*m),   # 帽板·右
        (cx,             cy),              # 帽板·底
        (cx - S*0.34*m,  cy - S*0.16*m),   # 帽板·左
    ]
    skull = [
        (cx - S*0.17*m,  cy - S*0.17*m),
        (cx + S*0.17*m,  cy - S*0.17*m),
        (cx + S*0.135*m, cy + S*0.19*m),
        (cx - S*0.135*m, cy + S*0.19*m),
    ]
    ta = (cx + S*0.34*m, cy - S*0.16*m)
    tb = (cx + S*0.34*m, cy + S*0.10*m)
    td = (cx + S*0.34*m, cy + S*0.16*m)
    return board, skull, ta, tb, td

def draw_cap(d, S, color, scale=1.0):
    board, skull, ta, tb, td = cap_geom(S, scale)
    d.polygon(skull, fill=color)
    d.polygon(board, fill=color)
    d.line([ta, tb], fill=color, width=max(2, int(S*0.016)))
    r = max(3, int(S*0.028))
    d.ellipse([td[0]-r, td[1]-r, td[0]+r, td[1]+r], fill=color)

def make_any(size):
    # 蓝色圆角方块（透明圆角），白色博士帽
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size, size], radius=int(size*0.22), fill=BLUE)
    draw_cap(d, size, WHITE)
    return img

def make_apple(size):
    # iOS：满幅蓝底（系统自行加圆角遮罩）
    img = Image.new('RGB', (size, size), BLUE)
    d = ImageDraw.Draw(img)
    draw_cap(d, size, WHITE)
    return img

def make_maskable(size):
    # 满幅蓝底，白帽收进安全区（避免被系统裁切）
    img = Image.new('RGB', (size, size), BLUE)
    d = ImageDraw.Draw(img)
    draw_cap(d, size, WHITE, scale=0.82)
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
