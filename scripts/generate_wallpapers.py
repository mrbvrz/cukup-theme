import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 3840, 2400

FONT_UNCUT_BOLD = "/Users/hasansuryaman/Library/Fonts/UncutSans-Bold.otf"
FONT_UNCUT_REGULAR = "/Users/hasansuryaman/Library/Fonts/UncutSans-Regular.otf"
FONT_COMMIT_REGULAR = "/Users/hasansuryaman/Library/Fonts/CommitMonoNerdFont-Regular.otf"
FONT_COMMIT_BOLD = "/Users/hasansuryaman/Library/Fonts/CommitMonoNerdFont-Bold.otf"

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def render_mesh_orb(canvas, cx, cy, rx, ry, color, blur_radius):
    orb = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(orb)
    draw.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=color)
    orb = orb.filter(ImageFilter.GaussianBlur(blur_radius))
    canvas.alpha_composite(orb)

def build_blurred_dark():
    print("Building Modern Blurred Dark Wallpaper...")
    # Base deep roasted espresso
    base_col = hex_to_rgb("#161413")
    canvas = Image.new("RGBA", (W, H), base_col + (255,))

    # Multi-point blurred glowing orbs (Mesh gradient effect)
    # Orb 1: Center-top warm Persimmon ember glow (#E87D4B)
    render_mesh_orb(canvas, int(W * 0.5), int(H * 0.42), int(W * 0.38), int(H * 0.32), hex_to_rgb("#E87D4B") + (110,), 240)
    
    # Orb 2: Lower-right subtle Cashmere Mauve (#B8969E)
    render_mesh_orb(canvas, int(W * 0.72), int(H * 0.65), int(W * 0.35), int(H * 0.35), hex_to_rgb("#B8969E") + (85,), 220)
    
    # Orb 3: Left-center Ceramic Celadon Teal ambient (#5E9EA0)
    render_mesh_orb(canvas, int(W * 0.28), int(H * 0.58), int(W * 0.32), int(H * 0.32), hex_to_rgb("#5E9EA0") + (75,), 230)

    # Orb 4: Center warm Honey Gold accent (#CCA062) behind text
    render_mesh_orb(canvas, int(W * 0.5), int(H * 0.48), int(W * 0.22), int(H * 0.18), hex_to_rgb("#CCA062") + (90,), 180)

    # Orb 5: Deep vignette shadow overlay around perimeter
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    v_draw = ImageDraw.Draw(vignette)
    v_draw.rectangle([0, 0, W, H], fill=(16, 14, 13, 70))
    # Cut soft center hole
    hole = Image.new("L", (W, H), 255)
    h_draw = ImageDraw.Draw(hole)
    h_draw.ellipse([W*0.1, H*0.1, W*0.9, H*0.9], fill=0)
    hole = hole.filter(ImageFilter.GaussianBlur(160))
    vignette.putalpha(hole)
    canvas.alpha_composite(vignette)

    # Micro grain to eliminate banding on 4K Retina
    grain = Image.effect_noise((W // 2, H // 2), 12).resize((W, H), Image.Resampling.BILINEAR).convert("L")
    grain_rgba = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    grain_rgba.putalpha(grain.point(lambda p: int(p * 0.04)))
    canvas.alpha_composite(grain_rgba)

    # Typography in center
    draw = ImageDraw.Draw(canvas)
    
    # "Cukup" title
    title_font = ImageFont.truetype(FONT_UNCUT_BOLD, 170)
    title_text = "Cukup"
    
    bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_w = bbox[2] - bbox[0]
    title_h = bbox[3] - bbox[1]
    
    title_x = (W - title_w) // 2
    title_y = int(H * 0.42) - (title_h // 2)

    # Soft ambient drop shadow under title
    shadow_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((title_x, title_y + 12), title_text, font=title_font, fill=(0, 0, 0, 160))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(25))
    canvas.alpha_composite(shadow_img)

    # Title text in warm parchment (#F4EFEA)
    draw.text((title_x, title_y), title_text, font=title_font, fill=hex_to_rgb("#F4EFEA") + (255,))

    # Tagline below: "Bukan kurang, bukan berlebih. Pas untuk kejernihan berpikir."
    tagline_font = ImageFont.truetype(FONT_UNCUT_REGULAR, 48)
    tagline_text = "Bukan kurang, bukan berlebih. Pas untuk kejernihan berpikir."
    
    t_bbox = draw.textbbox((0, 0), tagline_text, font=tagline_font)
    tagline_w = t_bbox[2] - t_bbox[0]
    tagline_h = t_bbox[3] - t_bbox[1]
    
    tagline_x = (W - tagline_w) // 2
    tagline_y = title_y + title_h + 60

    # Tagline drop shadow
    t_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ts_draw = ImageDraw.Draw(t_shadow)
    ts_draw.text((tagline_x, tagline_y + 6), tagline_text, font=tagline_font, fill=(0, 0, 0, 130))
    t_shadow = t_shadow.filter(ImageFilter.GaussianBlur(14))
    canvas.alpha_composite(t_shadow)

    # Tagline in warm cashmere cream (#C8BEB4)
    draw.text((tagline_x, tagline_y), tagline_text, font=tagline_font, fill=hex_to_rgb("#C8BEB4") + (230,))

    out_path = "/Users/hasansuryaman/cukup-theme/assets/wallpaper-dark.png"
    canvas.convert("RGB").save(out_path, quality=98)
    print("Saved:", out_path)

def build_blurred_light():
    print("Building Modern Blurred Light Wallpaper...")
    # Base warm paper linen
    base_col = hex_to_rgb("#FAF8F5")
    canvas = Image.new("RGBA", (W, H), base_col + (255,))

    # Multi-point blurred warm pastel washes
    # Orb 1: Center-top warm Terracotta glow (#E89058)
    render_mesh_orb(canvas, int(W * 0.5), int(H * 0.42), int(W * 0.38), int(H * 0.32), hex_to_rgb("#E89058") + (95,), 240)
    
    # Orb 2: Lower-right soft Lilac / Mauve (#B294C7)
    render_mesh_orb(canvas, int(W * 0.72), int(H * 0.65), int(W * 0.35), int(H * 0.35), hex_to_rgb("#B294C7") + (70,), 220)
    
    # Orb 3: Left-center Celadon Teal (#6BAFAD)
    render_mesh_orb(canvas, int(W * 0.28), int(H * 0.58), int(W * 0.32), int(H * 0.32), hex_to_rgb("#6BAFAD") + (75,), 230)

    # Orb 4: Center warm Gold sand (#DDA861)
    render_mesh_orb(canvas, int(W * 0.5), int(H * 0.48), int(W * 0.22), int(H * 0.18), hex_to_rgb("#DDA861") + (80,), 180)

    # Subtle grain
    grain = Image.effect_noise((W // 2, H // 2), 10).resize((W, H), Image.Resampling.BILINEAR).convert("L")
    grain_rgba = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    grain_rgba.putalpha(grain.point(lambda p: int(p * 0.03)))
    canvas.alpha_composite(grain_rgba)

    # Typography in center
    draw = ImageDraw.Draw(canvas)
    
    # "Cukup" title
    title_font = ImageFont.truetype(FONT_UNCUT_BOLD, 170)
    title_text = "Cukup"
    
    bbox = draw.textbbox((0, 0), title_text, font=title_font)
    title_w = bbox[2] - bbox[0]
    title_h = bbox[3] - bbox[1]
    
    title_x = (W - title_w) // 2
    title_y = int(H * 0.42) - (title_h // 2)

    # Subtle crisp ambient drop shadow
    shadow_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((title_x, title_y + 8), title_text, font=title_font, fill=(60, 45, 35, 45))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(20))
    canvas.alpha_composite(shadow_img)

    # Title text in deep roasted coffee bean (#26201C)
    draw.text((title_x, title_y), title_text, font=title_font, fill=hex_to_rgb("#26201C") + (255,))

    # Tagline below: "Bukan kurang, bukan berlebih. Pas untuk kejernihan berpikir."
    tagline_font = ImageFont.truetype(FONT_UNCUT_REGULAR, 48)
    tagline_text = "Bukan kurang, bukan berlebih. Pas untuk kejernihan berpikir."
    
    t_bbox = draw.textbbox((0, 0), tagline_text, font=tagline_font)
    tagline_w = t_bbox[2] - t_bbox[0]
    tagline_h = t_bbox[3] - t_bbox[1]
    
    tagline_x = (W - tagline_w) // 2
    tagline_y = title_y + title_h + 60

    # Tagline in muted warm slate (#665D54)
    draw.text((tagline_x, tagline_y), tagline_text, font=tagline_font, fill=hex_to_rgb("#665D54") + (230,))

    out_path = "/Users/hasansuryaman/cukup-theme/assets/wallpaper-light.png"
    canvas.convert("RGB").save(out_path, quality=98)
    print("Saved:", out_path)

if __name__ == "__main__":
    build_blurred_dark()
    build_blurred_light()
