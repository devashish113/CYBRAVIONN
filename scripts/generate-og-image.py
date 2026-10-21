#!/usr/bin/env python3
"""
Generate official 1200x630 OpenGraph / Twitter Card preview image for CYBRAVIONS.
Uses authentic high-resolution sovereign winged shield emblem with Sanskrit motto
over an executive obsidian background with warm backlight and cyber accents.
"""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def create_og_card(output_png, output_webp=None, logo_path="public/logo-horizontal.png", height_logo=280):
    W, H = 1200, 630
    
    # 1. Base dark obsidian background (#07080b)
    base = Image.new("RGBA", (W, H), (7, 8, 11, 255))
    
    # 2. Radial warm gold/amber ambient backlight behind shield center (~y=270)
    glow_center_x, glow_center_y = W // 2, 270
    
    y_coords, x_coords = np.ogrid[:H, :W]
    dist_from_center = np.sqrt((x_coords - glow_center_x)**2 + ((y_coords - glow_center_y) * 1.2)**2)
    
    max_r = 380.0
    gold_glow_intensity = np.clip(1.0 - (dist_from_center / max_r), 0, 1) ** 2
    
    glow_arr = np.zeros((H, W, 4), dtype=np.uint8)
    glow_arr[:, :, 0] = (gold_glow_intensity * 215 * 0.16).astype(np.uint8)
    glow_arr[:, :, 1] = (gold_glow_intensity * 155 * 0.14).astype(np.uint8)
    glow_arr[:, :, 2] = (gold_glow_intensity * 50 * 0.10).astype(np.uint8)
    glow_arr[:, :, 3] = (gold_glow_intensity * 255).astype(np.uint8)
    
    glow_img = Image.fromarray(glow_arr, mode="RGBA")
    base = Image.alpha_composite(base, glow_img)
    
    # 3. High-tech cyber grid layer (faint)
    grid_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_img)
    grid_step = 48
    
    for x in range(0, W, grid_step):
        grid_draw.line([(x, 0), (x, H)], fill=(200, 160, 90, 8), width=1)
    for y in range(0, H, grid_step):
        grid_draw.line([(0, y), (W, y)], fill=(200, 160, 90, 8), width=1)
        
    grid_mask = np.clip(1.0 - (dist_from_center / (W * 0.55)), 0, 1) ** 1.2
    grid_mask_img = Image.fromarray((grid_mask * 255).astype(np.uint8), mode="L")
    grid_img.putalpha(Image.composite(grid_img.split()[3], Image.new("L", (W, H), 0), grid_mask_img))
    
    base = Image.alpha_composite(base, grid_img)
    
    # 4. Subtle corner tech brackets
    frame_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    fdraw = ImageDraw.Draw(frame_img)
    margin = 24
    bracket_len = 36
    bracket_color = (200, 160, 80, 50)
    
    # Corners
    fdraw.line([(margin, margin), (margin + bracket_len, margin)], fill=bracket_color, width=2)
    fdraw.line([(margin, margin), (margin, margin + bracket_len)], fill=bracket_color, width=2)
    fdraw.line([(W - margin, margin), (W - margin - bracket_len, margin)], fill=bracket_color, width=2)
    fdraw.line([(W - margin, margin), (W - margin, margin + bracket_len)], fill=bracket_color, width=2)
    fdraw.line([(margin, H - margin), (margin + bracket_len, H - margin)], fill=bracket_color, width=2)
    fdraw.line([(margin, H - margin), (margin, H - margin - bracket_len)], fill=bracket_color, width=2)
    fdraw.line([(W - margin, H - margin), (W - margin - bracket_len, H - margin)], fill=bracket_color, width=2)
    fdraw.line([(W - margin, H - margin), (W - margin, H - margin - bracket_len)], fill=bracket_color, width=2)
    fdraw.rectangle([(margin, margin), (W - margin, H - margin)], outline=(200, 160, 80, 20), width=1)
    
    base = Image.alpha_composite(base, frame_img)
    
    # 5. Load and resize authentic logo
    logo = Image.open(logo_path).convert("RGBA")
    orig_w, orig_h = logo.size
    
    target_h = height_logo
    target_w = int(orig_w * (target_h / orig_h))
    
    logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # 6. Soft drop shadow
    shadow_offset = 6
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pos_x = (W - target_w) // 2
    pos_y = (H - target_h) // 2
    
    logo_alpha = logo_resized.split()[3]
    black_logo = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 200))
    black_logo.putalpha(logo_alpha)
    shadow.paste(black_logo, (pos_x, pos_y + shadow_offset), black_logo)
    shadow = shadow.filter(ImageFilter.GaussianBlur(14))
    
    base = Image.alpha_composite(base, shadow)
    base.paste(logo_resized, (pos_x, pos_y), logo_resized)
    
    final_card = base.convert("RGB")
    final_card.save(output_png, "PNG", quality=95, optimize=True)
    print(f"Saved {output_png} (1200x630)")
    
    if output_webp:
        final_card.save(output_webp, "WEBP", quality=95, method=6)
        print(f"Saved {output_webp} (1200x630)")

if __name__ == "__main__":
    create_og_card("public/og-image.png", "public/og-image.webp")
