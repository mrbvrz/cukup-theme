import math
from PIL import Image, ImageDraw, ImageFilter

W, H = 3840, 2400

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def lerp(a, b, t):
    return a + (b - a) * t

def lerp_color(c1, c2, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))

def create_dark_horizon_wallpaper():
    print("Generating Enhanced Horizon Waves (Dark / Cukup Kopi)...")
    # Base canvas: Deep rich roasted espresso
    base_color = hex_to_rgb("#100B02") # exactly from CleanShot reference
    canvas = Image.new("RGBA", (W, H), base_color + (255,))

    # We will build multi-layered atmospheric light waves from the top/horizon downwards
    # Wave 1: Broad background atmospheric warm glow (soft amber-mauve halo)
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(halo)
    
    # Large soft ellipse in upper region
    cx, cy = int(W * 0.5), int(H * -0.1)
    rx, ry = int(W * 0.9), int(H * 0.8)
    for i in range(100, 0, -1):
        t = i / 100.0
        r_col = lerp_color(hex_to_rgb("#942A16"), hex_to_rgb("#100B02"), t)
        h_draw.ellipse([cx - rx * t, cy - ry * t, cx + rx * t, cy + ry * t], fill=r_col + (255,))
    halo = halo.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(halo)

    # Wave 2: Layered Secondary Dune (Cashmere Mauve & Deep Persimmon under-glow)
    w2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    w2_draw = ImageDraw.Draw(w2)
    # Bezier curve spanning from left to right dipping down in the middle
    pts2 = []
    steps = 400
    for i in range(steps + 1):
        t = i / steps
        # undulating organic horizon curve
        x = t * W
        # curve peaks on left/right and dips gracefully in center
        curve_y = H * 0.38 + math.sin(t * math.pi) * (H * 0.16) + math.sin(t * 3 * math.pi) * (H * 0.04)
        pts2.append((x, curve_y))
    
    # Fill from top of screen down to this curve
    poly2 = [(0, 0)] + pts2 + [(W, 0)]
    w2_draw.polygon(poly2, fill=(0, 0, 0, 255))
    
    # Gradient inside wave 2
    grad2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g2_draw = ImageDraw.Draw(grad2)
    for y in range(int(H * 0.65)):
        t = y / (H * 0.65)
        # from rich golden amber to deep mauve espresso
        c = lerp_color(hex_to_rgb("#D6582E"), hex_to_rgb("#4A1525"), t)
        alpha = int(255 * (1.0 - t**1.5))
        g2_draw.line([(0, y), (W, y)], fill=c + (alpha,))
    grad2.putalpha(w2.split()[3])
    
    # Soft drop shadow under wave 2
    w2_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ws2_draw = ImageDraw.Draw(w2_shadow)
    shifted_pts2 = [(x, y + 25) for x, y in pts2]
    ws2_draw.polygon([(0, 0)] + shifted_pts2 + [(W, 0)], fill=(0, 0, 0, 140))
    w2_shadow = w2_shadow.filter(ImageFilter.GaussianBlur(50))
    canvas.alpha_composite(w2_shadow)
    canvas.alpha_composite(grad2)

    # Wave 3: Primary Hero Glowing Wave (Vibrant Persimmon Amber - Oliur/CleanShot signature)
    w3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    w3_draw = ImageDraw.Draw(w3)
    pts3 = []
    for i in range(steps + 1):
        t = i / steps
        x = t * W
        # sweeping asymmetrical curve that starts higher on left and flows down to middle-right
        curve_y = H * 0.28 + math.sin(t * 0.8 * math.pi + 0.2) * (H * 0.18) + math.cos(t * 2 * math.pi) * (H * 0.03)
        pts3.append((x, curve_y))
    
    poly3 = [(0, 0)] + pts3 + [(W, 0)]
    w3_draw.polygon(poly3, fill=(0, 0, 0, 255))

    grad3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g3_draw = ImageDraw.Draw(grad3)
    # The gradient transitions from vibrant radiant persimmon top (#E88A45) to fiery sunset (#D2482A) to deep espresso ember
    for y in range(int(H * 0.55)):
        t = y / (H * 0.55)
        c = lerp_color(hex_to_rgb("#E88844"), hex_to_rgb("#831E0E"), t)
        alpha = int(255 * (1.0 - t**1.3))
        g3_draw.line([(0, y), (W, y)], fill=c + (alpha,))
    grad3.putalpha(w3.split()[3])

    # Soft drop shadow under wave 3
    w3_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ws3_draw = ImageDraw.Draw(w3_shadow)
    shifted_pts3 = [(x, y + 30) for x, y in pts3]
    ws3_draw.polygon([(0, 0)] + shifted_pts3 + [(W, 0)], fill=(0, 0, 0, 160))
    w3_shadow = w3_shadow.filter(ImageFilter.GaussianBlur(60))
    canvas.alpha_composite(w3_shadow)
    canvas.alpha_composite(grad3)

    # Wave 4: Delicate Crest Rim Light (Specular Edge along Wave 3)
    rim3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r3_draw = ImageDraw.Draw(rim3)
    for i in range(len(pts3) - 1):
        t = i / len(pts3)
        glow_alpha = int(180 * math.sin(t * math.pi))
        r3_draw.line([pts3[i], pts3[i+1]], fill=(255, 215, 170, glow_alpha), width=3)
    rim3_blur = rim3.filter(ImageFilter.GaussianBlur(4))
    canvas.alpha_composite(rim3_blur)
    canvas.alpha_composite(rim3)

    # Wave 5: Front Delicate Accent Ribbon (Honey Gold & Persimmon subtle wave)
    w5 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    w5_draw = ImageDraw.Draw(w5)
    pts5 = []
    for i in range(steps + 1):
        t = i / steps
        x = t * W
        curve_y = H * 0.18 + math.sin((t - 0.1) * math.pi) * (H * 0.14)
        pts5.append((x, curve_y))
    
    poly5 = [(0, 0)] + pts5 + [(W, 0)]
    w5_draw.polygon(poly5, fill=(0, 0, 0, 255))
    grad5 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g5_draw = ImageDraw.Draw(grad5)
    for y in range(int(H * 0.35)):
        t = y / (H * 0.35)
        c = lerp_color(hex_to_rgb("#F7A768"), hex_to_rgb("#C25022"), t)
        alpha = int(255 * (1.0 - t))
        g5_draw.line([(0, y), (W, y)], fill=c + (alpha,))
    grad5.putalpha(w5.split()[3])

    w5_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ws5_draw = ImageDraw.Draw(w5_shadow)
    ws5_draw.polygon([(0, 0)] + [(x, y + 20) for x, y in pts5] + [(W, 0)], fill=(0, 0, 0, 110))
    w5_shadow = w5_shadow.filter(ImageFilter.GaussianBlur(35))
    canvas.alpha_composite(w5_shadow)
    canvas.alpha_composite(grad5)

    # Front Rim highlight
    rim5 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r5_draw = ImageDraw.Draw(rim5)
    for i in range(len(pts5) - 1):
        t = i / len(pts5)
        glow_alpha = int(220 * math.sin(t * math.pi))
        r5_draw.line([pts5[i], pts5[i+1]], fill=(255, 235, 205, glow_alpha), width=3)
    rim5_blur = rim5.filter(ImageFilter.GaussianBlur(3))
    canvas.alpha_composite(rim5_blur)
    canvas.alpha_composite(rim5)

    out_dark = "/Users/hasansuryaman/cukup-theme/assets/wallpaper-dark.png"
    canvas.convert("RGB").save(out_dark, quality=98)
    print("Saved:", out_dark)

def create_light_horizon_wallpaper():
    print("Generating Enhanced Horizon Waves (Light / Cukup Terang)...")
    # Base canvas: Warm clean linen paper
    base_color = hex_to_rgb("#FAF8F5")
    canvas = Image.new("RGBA", (W, H), base_color + (255,))

    # Wave 1: Soft ambient sky halo (terracotta morning warmth)
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(halo)
    cx, cy = int(W * 0.5), int(H * -0.1)
    rx, ry = int(W * 0.9), int(H * 0.8)
    for i in range(100, 0, -1):
        t = i / 100.0
        r_col = lerp_color(hex_to_rgb("#F0CDBA"), hex_to_rgb("#FAF8F5"), t)
        h_draw.ellipse([cx - rx * t, cy - ry * t, cx + rx * t, cy + ry * t], fill=r_col + (255,))
    halo = halo.filter(ImageFilter.GaussianBlur(120))
    canvas.alpha_composite(halo)

    steps = 400
    # Wave 2: Layered Secondary Dune (Soft Celadon & Sandstone morning haze)
    w2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    w2_draw = ImageDraw.Draw(w2)
    pts2 = []
    for i in range(steps + 1):
        t = i / steps
        x = t * W
        curve_y = H * 0.38 + math.sin(t * math.pi) * (H * 0.16) + math.sin(t * 3 * math.pi) * (H * 0.04)
        pts2.append((x, curve_y))
    poly2 = [(0, 0)] + pts2 + [(W, 0)]
    w2_draw.polygon(poly2, fill=(0, 0, 0, 255))
    
    grad2 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g2_draw = ImageDraw.Draw(grad2)
    for y in range(int(H * 0.65)):
        t = y / (H * 0.65)
        c = lerp_color(hex_to_rgb("#E5C5A8"), hex_to_rgb("#B8D3CE"), t)
        alpha = int(255 * (1.0 - t**1.3))
        g2_draw.line([(0, y), (W, y)], fill=c + (alpha,))
    grad2.putalpha(w2.split()[3])

    # Light shadow
    w2_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ws2_draw = ImageDraw.Draw(w2_shadow)
    ws2_draw.polygon([(0, 0)] + [(x, y + 25) for x, y in pts2] + [(W, 0)], fill=(80, 60, 50, 50))
    w2_shadow = w2_shadow.filter(ImageFilter.GaussianBlur(45))
    canvas.alpha_composite(w2_shadow)
    canvas.alpha_composite(grad2)

    # Wave 3: Primary Hero Wave (Warm Terracotta Clay Light)
    w3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    w3_draw = ImageDraw.Draw(w3)
    pts3 = []
    for i in range(steps + 1):
        t = i / steps
        x = t * W
        curve_y = H * 0.28 + math.sin(t * 0.8 * math.pi + 0.2) * (H * 0.18) + math.cos(t * 2 * math.pi) * (H * 0.03)
        pts3.append((x, curve_y))
    poly3 = [(0, 0)] + pts3 + [(W, 0)]
    w3_draw.polygon(poly3, fill=(0, 0, 0, 255))

    grad3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g3_draw = ImageDraw.Draw(grad3)
    for y in range(int(H * 0.55)):
        t = y / (H * 0.55)
        c = lerp_color(hex_to_rgb("#F5B588"), hex_to_rgb("#D48555"), t)
        alpha = int(255 * (1.0 - t**1.2))
        g3_draw.line([(0, y), (W, y)], fill=c + (alpha,))
    grad3.putalpha(w3.split()[3])

    w3_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ws3_draw = ImageDraw.Draw(w3_shadow)
    ws3_draw.polygon([(0, 0)] + [(x, y + 30) for x, y in pts3] + [(W, 0)], fill=(80, 50, 40, 65))
    w3_shadow = w3_shadow.filter(ImageFilter.GaussianBlur(55))
    canvas.alpha_composite(w3_shadow)
    canvas.alpha_composite(grad3)

    # Rim light along wave 3
    rim3 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r3_draw = ImageDraw.Draw(rim3)
    for i in range(len(pts3) - 1):
        t = i / len(pts3)
        glow_alpha = int(210 * math.sin(t * math.pi))
        r3_draw.line([pts3[i], pts3[i+1]], fill=(255, 255, 255, glow_alpha), width=3)
    rim3_blur = rim3.filter(ImageFilter.GaussianBlur(3))
    canvas.alpha_composite(rim3_blur)
    canvas.alpha_composite(rim3)

    # Wave 5: Front Amber Glow
    w5 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    w5_draw = ImageDraw.Draw(w5)
    pts5 = []
    for i in range(steps + 1):
        t = i / steps
        x = t * W
        curve_y = H * 0.18 + math.sin((t - 0.1) * math.pi) * (H * 0.14)
        pts5.append((x, curve_y))
    poly5 = [(0, 0)] + pts5 + [(W, 0)]
    w5_draw.polygon(poly5, fill=(0, 0, 0, 255))

    grad5 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g5_draw = ImageDraw.Draw(grad5)
    for y in range(int(H * 0.35)):
        t = y / (H * 0.35)
        c = lerp_color(hex_to_rgb("#FCE2C4"), hex_to_rgb("#EDB887"), t)
        alpha = int(255 * (1.0 - t))
        g5_draw.line([(0, y), (W, y)], fill=c + (alpha,))
    grad5.putalpha(w5.split()[3])

    w5_shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ws5_draw = ImageDraw.Draw(w5_shadow)
    ws5_draw.polygon([(0, 0)] + [(x, y + 20) for x, y in pts5] + [(W, 0)], fill=(80, 50, 40, 50))
    w5_shadow = w5_shadow.filter(ImageFilter.GaussianBlur(30))
    canvas.alpha_composite(w5_shadow)
    canvas.alpha_composite(grad5)

    rim5 = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r5_draw = ImageDraw.Draw(rim5)
    for i in range(len(pts5) - 1):
        t = i / len(pts5)
        glow_alpha = int(240 * math.sin(t * math.pi))
        r5_draw.line([pts5[i], pts5[i+1]], fill=(255, 255, 255, glow_alpha), width=3)
    rim5_blur = rim5.filter(ImageFilter.GaussianBlur(2))
    canvas.alpha_composite(rim5_blur)
    canvas.alpha_composite(rim5)

    out_light = "/Users/hasansuryaman/cukup-theme/assets/wallpaper-light.png"
    canvas.convert("RGB").save(out_light, quality=98)
    print("Saved:", out_light)

if __name__ == "__main__":
    create_dark_horizon_wallpaper()
    create_light_horizon_wallpaper()
