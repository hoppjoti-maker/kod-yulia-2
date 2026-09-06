#!/usr/bin/env python3
"""Cover-crop the cinematic still to 1200×630 and composite the title lockup."""

from __future__ import annotations

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

SRC = "/workspace/artifacts/imagine_images/ed6a3150-c103-42fd-8eb7-d004d488022f.jpg"
OUT_PNG = "/workspace/.grok/og-composited.png"

W, H = 1200, 630
PAPER = (240, 236, 228, 255)  # #f0ece4
TEAL = (139, 184, 176, 230)  # #8bb8b0
INK = (12, 13, 16, 255)  # #0c0d10

TITLE = "КОД ЮЛИЯ"
TAG = "ЧАСТЬ II"

SERIF_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"


def cover_crop(im: Image.Image, tw: int, th: int) -> Image.Image:
    scale = max(tw / im.width, th / im.height)
    nw, nh = int(round(im.width * scale)), int(round(im.height * scale))
    resized = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return resized.crop((left, top, left + tw, top + th))


def tracked_width(font: ImageFont.FreeTypeFont, text: str, tracking: int) -> int:
    dummy = ImageDraw.Draw(Image.new("L", (1, 1)))
    if not text:
        return 0
    total = 0
    for i, ch in enumerate(text):
        bbox = dummy.textbbox((0, 0), ch, font=font)
        total += bbox[2] - bbox[0]
        if i < len(text) - 1:
            total += tracking
    return total


def draw_tracked(
    base: Image.Image,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    cx: int,
    y: int,
    tracking: int,
    shadow: bool = True,
) -> None:
    width = tracked_width(font, text, tracking)
    x = int(cx - width / 2)
    dummy = ImageDraw.Draw(Image.new("L", (1, 1)))
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cursor = x
    for i, ch in enumerate(text):
        bbox = dummy.textbbox((0, 0), ch, font=font)
        cw = bbox[2] - bbox[0]
        if shadow:
            draw.text((cursor + 1, y + 2), ch, font=font, fill=(12, 13, 16, 180))
        draw.text((cursor, y), ch, font=font, fill=fill)
        cursor += cw + tracking
    if shadow:
        glow = layer.filter(ImageFilter.GaussianBlur(radius=6))
        base.alpha_composite(glow)
    base.alpha_composite(layer)


def bottom_vignette(size: tuple[int, int]) -> Image.Image:
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    # Soft lift of near-black over the lower third so paper type holds.
    for i in range(260):
        t = i / 259
        alpha = int(200 * (t**1.55))
        y = H - 260 + i
        draw.line([(0, y), (W, y)], fill=(12, 13, 16, alpha))
    return overlay


def main() -> None:
    src = Image.open(SRC).convert("RGB")
    card = cover_crop(src, W, H).convert("RGBA")
    card = ImageEnhance.Contrast(card).enhance(1.04)
    card = ImageEnhance.Color(card).enhance(0.96)
    card.alpha_composite(bottom_vignette(card.size))

    title_font = ImageFont.truetype(SERIF_BOLD, 78)
    tag_font = ImageFont.truetype(SERIF, 26)

    title_tracking = 14
    tag_tracking = 10
    title_w = tracked_width(title_font, TITLE, title_tracking)

    # Lockup sits in the lower third, centered, with ~56px bottom margin.
    title_y = 468
    rule_y = 560
    tag_y = 576

    draw_tracked(card, TITLE, title_font, PAPER, W // 2, title_y, title_tracking)

    rule = Image.new("RGBA", card.size, (0, 0, 0, 0))
    rdraw = ImageDraw.Draw(rule)
    rule_w = int(title_w * 0.42)
    x0 = (W - rule_w) // 2
    rdraw.rectangle((x0, rule_y, x0 + rule_w, rule_y + 2), fill=TEAL)
    # hairline shadow
    rdraw.rectangle((x0, rule_y + 2, x0 + rule_w, rule_y + 3), fill=(12, 13, 16, 120))
    card.alpha_composite(rule)

    draw_tracked(card, TAG, tag_font, (*TEAL[:3], 245), W // 2, tag_y, tag_tracking, shadow=True)

    card.convert("RGB").save(OUT_PNG, "PNG")
    print(f"wrote {OUT_PNG} {card.size}")


if __name__ == "__main__":
    main()
