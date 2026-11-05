import math
import os
from PIL import Image, ImageDraw, ImageFilter

W, H = 3840, 2400

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def lerp_color(c1, c2, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))

def cubic_bezier(p0, p1, p2, p3, t):
    it = 1.0 - t
    x = it**3 * p0[0] + 3*it**2 * t * p1[0] + 3*it * t**2 * p2[0] + t**3 * p3[0]
    y = it**3 * p0[1] + 3*it**2 * t * p1[1] + 3*it * t**2 * p2[1] + t**3 * p3[1]
    return (x, y)

def generate_wave_curve(p0, p1, p2, p3, steps=300):
    points = []
    for i in range(steps + 1):
        t = i / steps
        points.append(cubic_bezier(p0, p1, p2, p3, t))
    return points

def render_3d_wave_ribbon(canvas, top_curve, bottom_curve, c_highlight, c_mid, c_shadow, shadow_blur=50, shadow_alpha=110, rim_color=(255, 255, 255, 120)):
    # 1. Build polygon path
    poly = top_curve + list(reversed(bottom_curve))
    
    xs = [p[0] for p in poly]
    ys = [p[1] for p in poly]
    min_x, max_x = max(0, int(min(xs))), min(W, int(max(xs)))
    min_y, max_y = max(0, int(min(ys))), min(H, int(max(ys)))
    
    pw = max(10, max_x - min_x)
    ph = max(10, max_y - min_y)

    # 2. Render deep volumetric drop shadow under this wave
    if shadow_alpha > 0 and shadow_blur > 0:
        pad = shadow_blur * 3
        s_img = Image.new("RGBA", (pw + pad * 2, ph + pad * 2), (0, 0, 0, 0))
        s_draw = ImageDraw.Draw(s_img)
        shifted_poly = [(x - min_x + pad, y - min_y + pad + 25) for x, y in poly]
        s_draw.polygon(shifted_poly, fill=(0, 0, 0, shadow_alpha))
        s_img = s_img.filter(ImageFilter.GaussianBlur(shadow_blur))
        canvas.alpha_composite(s_img, (min_x - pad, min_y - pad))

    # 3. Render 3D shaded body
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    l_draw = ImageDraw.Draw(layer)

    # We fill vertical strips or interpolations along the wave to give realistic 3D volumetric cylinder curvature
    steps = len(top_curve) - 1
    for i in range(steps):
        t = i / steps
        # Color along the wave path
        # Wave crest gets light, trough gets shadow
        color_base = lerp_color(c_mid, c_highlight, math.sin(t * math.pi))
        
        tp1, tp2 = top_curve[i], top_curve[i+1]
        bp1, bp2 = bottom_curve[i], bottom_curve[i+1]
        
        # Vertical gradient inside each quad
        quad = [tp1, tp2, bp2, bp1]
        # Shaded color towards bottom of ribbon
        c_top = lerp_color(color_base, c_highlight, 0.35)
        c_bot = lerp_color(color_base, c_shadow, 0.55)
        
        # Draw trapezoid
        avg_col = lerp_color(c_top, c_bot, 0.4)
        l_draw.polygon(quad, fill=avg_col + (245,))

    # Smooth the body shading slightly for liquid frosted effect
    layer_blurred = layer.filter(ImageFilter.GaussianBlur(4))
    
    # Sharp mask of the ribbon
    mask = Image.new("L", (W, H), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.polygon(poly, fill=255)
    
    # Composite the shaded body onto canvas
    canvas.paste(layer_blurred, (0, 0), mask)

    # 4. Frosted Rim Specular Highlight along the top edge
    rim_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r_draw = ImageDraw.Draw(rim_img)
    for i in range(len(top_curve) - 1):
        t = i / len(top_curve)
        alpha = int(rim_color[3] * (0.4 + 0.6 * math.sin(t * math.pi)))
        r_col = (rim_color[0], rim_color[1], rim_color[2], alpha)
        r_draw.line([top_curve[i], top_curve[i+1]], fill=r_col, width=3)
    
    rim_glow = rim_img.filter(ImageFilter.GaussianBlur(2))
    canvas.alpha_composite(rim_glow)
    canvas.alpha_composite(rim_img)

def build_3d_waves_dark():
    print("Rendering 3D Color Waves (Dark / Cukup Kopi)...")
    # Base deep espresso canvas with subtle directional lighting
    bg_center = hex_to_rgb("#1E1B19")
    bg_edge = hex_to_rgb("#100F0E")
    
    canvas = Image.new("RGBA", (W, H), bg_edge + (255,))
    c_draw = ImageDraw.Draw(canvas)
    
    # Smooth background vignette
    steps = 80
    cx, cy, r_max = int(W * 0.65), int(H * 0.7), int(W * 0.9)
    for i in range(steps, 0, -1):
        t = i / steps
        r = r_max * t
        c = lerp_color(bg_center, bg_edge, t)
        c_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c + (255,))
    canvas = canvas.filter(ImageFilter.GaussianBlur(90))

    # Stacked 3D Waves flowing elegantly across the screen (Oliur style)
    # Wave 1 (Deep Obsidian Backing Wave)
    w1_top = generate_wave_curve((-200, 1900), (900, 1100), (2200, 1700), (4100, 700))
    w1_bot = generate_wave_curve((-200, 2600), (900, 2200), (2200, 2600), (4100, 2200))
    render_3d_wave_ribbon(
        canvas, w1_top, w1_bot,
        c_highlight=hex_to_rgb("#2A2420"),
        c_mid=hex_to_rgb("#1E1A17"),
        c_shadow=hex_to_rgb("#0E0C0B"),
        shadow_blur=60, shadow_alpha=140,
        rim_color=(255, 230, 210, 60)
    )

    # Wave 2 (Ceramic Celadon Teal Translucent Wave)
    w2_top = generate_wave_curve((-100, 1700), (1050, 950), (2350, 1600), (4100, 850))
    w2_bot = generate_wave_curve((-100, 2150), (1050, 1650), (2350, 2200), (4100, 1600))
    render_3d_wave_ribbon(
        canvas, w2_top, w2_bot,
        c_highlight=hex_to_rgb("#7AB7B9"),
        c_mid=hex_to_rgb("#5E9EA0"),
        c_shadow=hex_to_rgb("#183233"),
        shadow_blur=55, shadow_alpha=130,
        rim_color=(210, 245, 245, 110)
    )

    # Wave 3 (Cashmere Mauve Frosted Wave)
    w3_top = generate_wave_curve((100, 1850), (1200, 1100), (2500, 1750), (4100, 1050))
    w3_bot = generate_wave_curve((100, 2300), (1200, 1750), (2500, 2300), (4100, 1800))
    render_3d_wave_ribbon(
        canvas, w3_top, w3_bot,
        c_highlight=hex_to_rgb("#CCAEC7"),
        c_mid=hex_to_rgb("#B8969E"),
        c_shadow=hex_to_rgb("#452F39"),
        shadow_blur=55, shadow_alpha=135,
        rim_color=(250, 230, 240, 120)
    )

    # Wave 4 (Hero Persimmon Terracotta Wave - Oliur Signature Depth)
    w4_top = generate_wave_curve((300, 2000), (1400, 1180), (2650, 1850), (4100, 1200))
    w4_bot = generate_wave_curve((300, 2550), (1400, 1950), (2650, 2450), (4100, 2050))
    render_3d_wave_ribbon(
        canvas, w4_top, w4_bot,
        c_highlight=hex_to_rgb("#F7A779"),
        c_mid=hex_to_rgb("#E87D4B"),
        c_shadow=hex_to_rgb("#6B2B0E"),
        shadow_blur=65, shadow_alpha=160,
        rim_color=(255, 240, 220, 170)
    )

    # Wave 5 (Glowing Amber Accent Ribbon on top)
    w5_top = generate_wave_curve((600, 2200), (1600, 1380), (2800, 2000), (4100, 1450))
    w5_bot = generate_wave_curve((600, 2550), (1600, 1850), (2800, 2450), (4100, 2150))
    render_3d_wave_ribbon(
        canvas, w5_top, w5_bot,
        c_highlight=hex_to_rgb("#F0C285"),
        c_mid=hex_to_rgb("#CCA062"),
        c_shadow=hex_to_rgb("#634216"),
        shadow_blur=50, shadow_alpha=140,
        rim_color=(255, 248, 230, 160)
    )

    out_file = "/Users/hasansuryaman/cukup-theme/assets/wallpaper-dark.png"
    canvas.convert("RGB").save(out_file, quality=98)
    print("Saved:", out_file)

def build_3d_waves_light():
    print("Rendering 3D Color Waves (Light / Cukup Terang)...")
    # Base warm linen canvas
    bg_center = hex_to_rgb("#FAF8F5")
    bg_edge = hex_to_rgb("#ECE6DC")
    
    canvas = Image.new("RGBA", (W, H), bg_edge + (255,))
    c_draw = ImageDraw.Draw(canvas)
    
    steps = 80
    cx, cy, r_max = int(W * 0.65), int(H * 0.7), int(W * 0.9)
    for i in range(steps, 0, -1):
        t = i / steps
        r = r_max * t
        c = lerp_color(bg_center, bg_edge, t)
        c_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c + (255,))
    canvas = canvas.filter(ImageFilter.GaussianBlur(90))

    # Stacked 3D Waves in Light Cukup Palette
    # Wave 1 (Soft Sandstone Translucent Glass Wave)
    w1_top = generate_wave_curve((-200, 1900), (900, 1100), (2200, 1700), (4100, 700))
    w1_bot = generate_wave_curve((-200, 2600), (900, 2200), (2200, 2600), (4100, 2200))
    render_3d_wave_ribbon(
        canvas, w1_top, w1_bot,
        c_highlight=hex_to_rgb("#F5F1E8"),
        c_mid=hex_to_rgb("#DDD5C8"),
        c_shadow=hex_to_rgb("#B8AE9E"),
        shadow_blur=50, shadow_alpha=65,
        rim_color=(255, 255, 255, 180)
    )

    # Wave 2 (Celadon Frosted Wave)
    w2_top = generate_wave_curve((-100, 1700), (1050, 950), (2350, 1600), (4100, 850))
    w2_bot = generate_wave_curve((-100, 2150), (1050, 1650), (2350, 2200), (4100, 1600))
    render_3d_wave_ribbon(
        canvas, w2_top, w2_bot,
        c_highlight=hex_to_rgb("#A0CECB"),
        c_mid=hex_to_rgb("#6BAFAD"),
        c_shadow=hex_to_rgb("#3D7A78"),
        shadow_blur=45, shadow_alpha=70,
        rim_color=(255, 255, 255, 200)
    )

    # Wave 3 (Soft Mauve/Lilac Wave)
    w3_top = generate_wave_curve((100, 1850), (1200, 1100), (2500, 1750), (4100, 1050))
    w3_bot = generate_wave_curve((100, 2300), (1200, 1750), (2500, 2300), (4100, 1800))
    render_3d_wave_ribbon(
        canvas, w3_top, w3_bot,
        c_highlight=hex_to_rgb("#D6C0CF"),
        c_mid=hex_to_rgb("#B294C7"),
        c_shadow=hex_to_rgb("#7D5B94"),
        shadow_blur=50, shadow_alpha=70,
        rim_color=(255, 255, 255, 190)
    )

    # Wave 4 (Hero Terracotta Clay Wave)
    w4_top = generate_wave_curve((300, 2000), (1400, 1180), (2650, 1850), (4100, 1200))
    w4_bot = generate_wave_curve((300, 2550), (1400, 1950), (2650, 2450), (4100, 2050))
    render_3d_wave_ribbon(
        canvas, w4_top, w4_bot,
        c_highlight=hex_to_rgb("#F5A574"),
        c_mid=hex_to_rgb("#E89058"),
        c_shadow=hex_to_rgb("#A8521E"),
        shadow_blur=60, shadow_alpha=85,
        rim_color=(255, 245, 235, 220)
    )

    # Wave 5 (Warm Gold Glass Accent Ribbon)
    w5_top = generate_wave_curve((600, 2200), (1600, 1380), (2800, 2000), (4100, 1450))
    w5_bot = generate_wave_curve((600, 2550), (1600, 1850), (2800, 2450), (4100, 2150))
    render_3d_wave_ribbon(
        canvas, w5_top, w5_bot,
        c_highlight=hex_to_rgb("#F5C97A"),
        c_mid=hex_to_rgb("#DDA861"),
        c_shadow=hex_to_rgb("#946624"),
        shadow_blur=45, shadow_alpha=75,
        rim_color=(255, 250, 235, 210)
    )

    out_file = "/Users/hasansuryaman/cukup-theme/assets/wallpaper-light.png"
    canvas.convert("RGB").save(out_file, quality=98)
    print("Saved:", out_file)

if __name__ == "__main__":
    build_3d_waves_dark()
    build_3d_waves_light()
