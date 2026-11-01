const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);

  return Buffer.concat([lenBuf, toCrc, crcBuf]);
}

function renderStashIcon(size) {
  const width = size;
  const height = size;
  const buffer = Buffer.alloc(width * height * 4, 0);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = (y * width + x) * 4;
    // Alpha blending
    const srcA = a / 255;
    const dstA = buffer[idx + 3] / 255;
    const outA = srcA + dstA * (1 - srcA);
    if (outA <= 0) return;

    buffer[idx] = Math.round((r * srcA + buffer[idx] * dstA * (1 - srcA)) / outA);
    buffer[idx + 1] = Math.round((g * srcA + buffer[idx + 1] * dstA * (1 - srcA)) / outA);
    buffer[idx + 2] = Math.round((b * srcA + buffer[idx + 2] * dstA * (1 - srcA)) / outA);
    buffer[idx + 3] = Math.round(outA * 255);
  }

  function fillRoundRect(rx1, ry1, rx2, ry2, radius, r, g, b, a = 255) {
    for (let y = Math.floor(ry1); y <= Math.ceil(ry2); y++) {
      for (let x = Math.floor(rx1); x <= Math.ceil(rx2); x++) {
        let inside = true;
        if (x < rx1 + radius && y < ry1 + radius) {
          const dx = x - (rx1 + radius);
          const dy = y - (ry1 + radius);
          if (dx * dx + dy * dy > radius * radius) inside = false;
        } else if (x > rx2 - radius && y < ry1 + radius) {
          const dx = x - (rx2 - radius);
          const dy = y - (ry1 + radius);
          if (dx * dx + dy * dy > radius * radius) inside = false;
        } else if (x < rx1 + radius && y > ry2 - radius) {
          const dx = x - (rx1 + radius);
          const dy = y - (ry2 - radius);
          if (dx * dx + dy * dy > radius * radius) inside = false;
        } else if (x > rx2 - radius && y > ry2 - radius) {
          const dx = x - (rx2 - radius);
          const dy = y - (ry2 - radius);
          if (dx * dx + dy * dy > radius * radius) inside = false;
        }
        if (inside) {
          setPixel(x, y, r, g, b, a);
        }
      }
    }
  }

  function strokeRoundRect(rx1, ry1, rx2, ry2, radius, strokeW, r, g, b, a = 255) {
    fillRoundRect(rx1, ry1, rx2, ry2, radius, r, g, b, a);
    fillRoundRect(rx1 + strokeW, ry1 + strokeW, rx2 - strokeW, ry2 - strokeW, Math.max(0, radius - strokeW), 4, 7, 13, 255);
  }

  // 1. Base App Tile
  const cr = size * 0.22;
  fillRoundRect(0, 0, size - 1, size - 1, cr, 4, 7, 13, 255);

  // Subtle border
  const borderW = Math.max(2, Math.round(size * 0.015));
  strokeRoundRect(0, 0, size - 1, size - 1, cr, borderW, 16, 185, 129, 120);

  // 2. Vault / Stash Layer 1 (Top Tray)
  const t1_w = size * 0.58;
  const t1_h = size * 0.16;
  const t1_x = (size - t1_w) / 2;
  const t1_y = size * 0.28;
  const t_r = size * 0.035;

  fillRoundRect(t1_x, t1_y, t1_x + t1_w, t1_y + t1_h, t_r, 13, 20, 32, 255);
  strokeRoundRect(t1_x, t1_y, t1_x + t1_w, t1_y + t1_h, t_r, Math.max(2, Math.round(size * 0.015)), 16, 185, 129, 255);

  // Top Handle
  const h1_w = size * 0.16;
  const h1_h = size * 0.035;
  const h1_x = (size - h1_w) / 2;
  const h1_y = t1_y + (t1_h - h1_h) / 2;
  fillRoundRect(h1_x, h1_y, h1_x + h1_w, h1_y + h1_h, h1_h / 2, 0, 242, 161, 255);

  // 3. Vault / Stash Layer 2 (Middle Tray)
  const t2_w = size * 0.48;
  const t2_h = size * 0.14;
  const t2_x = (size - t2_w) / 2;
  const t2_y = t1_y + t1_h + size * 0.04;
  fillRoundRect(t2_x, t2_y, t2_x + t2_w, t2_y + t2_h, t_r, 9, 13, 22, 255);
  strokeRoundRect(t2_x, t2_y, t2_x + t2_w, t2_y + t2_h, t_r, Math.max(2, Math.round(size * 0.012)), 6, 182, 212, 255);

  // Middle Slot bar
  const h2_w = size * 0.18;
  const h2_h = size * 0.025;
  const h2_x = (size - h2_w) / 2;
  const h2_y = t2_y + (t2_h - h2_h) / 2;
  fillRoundRect(h2_x, h2_y, h2_x + h2_w, h2_y + h2_h, h2_h / 2, 6, 182, 212, 255);

  // Middle LED dots
  fillRoundRect(t2_x + size * 0.04, t2_y + t2_h / 2 - 3, t2_x + size * 0.04 + 6, t2_y + t2_h / 2 + 3, 3, 16, 185, 129, 255);

  // 4. Vault / Stash Layer 3 (Base Tray)
  const t3_w = size * 0.38;
  const t3_h = size * 0.12;
  const t3_x = (size - t3_w) / 2;
  const t3_y = t2_y + t2_h + size * 0.04;
  fillRoundRect(t3_x, t3_y, t3_x + t3_w, t3_y + t3_h, t_r, 6, 9, 14, 255);
  strokeRoundRect(t3_x, t3_y, t3_x + t3_w, t3_y + t3_h, t_r, Math.max(2, Math.round(size * 0.012)), 16, 185, 129, 200);

  // Lock Keyhole
  const l_w = size * 0.06;
  const l_h = size * 0.035;
  const l_x = (size - l_w) / 2;
  const l_y = t3_y + (t3_h - l_h) / 2;
  fillRoundRect(l_x, l_y, l_x + l_w, l_y + l_h, l_h / 2, 0, 242, 161, 255);

  // Encode PNG
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // non-interlaced

  const scanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    scanlines[rowOffset] = 0; // filter type 0
    buffer.copy(scanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(scanlines);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const outDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'icon-192.png'), renderStashIcon(192));
console.log('Generated icon-192.png');
fs.writeFileSync(path.join(outDir, 'icon-512.png'), renderStashIcon(512));
console.log('Generated icon-512.png');
