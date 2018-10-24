/**
 * hsl to rgb
 *
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @returns
 */
function HSL2RGB(h: number, s: number, l: number) {
  let r, g, b;

  if (h < 0) {
    h = 0;
  }
  if (h > 1) {
    h = 1;
  }

  if (s < 0) {
    s = 0;
  }
  if (s > 1) {
    s = 1;
  }

  if (l < 0) {
    l = 0;
  }
  if (l > 1) {
    l = 1;
  }

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

/**
 * hue to rgb
 *
 * @param {number} p
 * @param {number} q
 * @param {number} t
 * @returns
 */
function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

/**
 * rgb to hsl
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns
 */
function RGB2HSL(r: number, g: number, b: number) {
  (r /= 255), (g /= 255), (b /= 255);

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let h = 0,
    s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h,
    s: s,
    l: l
  };
}

/**
 * hex to rgb
 *
 * @param {string} hex
 * @returns
 */
function HEX2RGB(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

/**
 * rgb to hex
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns
 */
function RGB2HEX(r: number, g: number, b: number) {
  return (
    '#' +
    parseInt(((1 << 24) + (r << 16) + (g << 8) + b).toFixed(0), 10)
      .toString(16)
      .slice(1)
  );
}

/**
 * 颜色暗化
 *
 * @export
 * @param {string} color
 * @param {string} amount
 * @returns
 */
export function darken(color: string, amount: string) {
  let R_G_B = HEX2RGB(color);
  // if (R_G_B) {
  //   throw new Error('HEX color required');
  // }

  const H_S_L = RGB2HSL(R_G_B!.r, R_G_B!.g, R_G_B!.b);

  let amountFormat;
  if (/^-?\d+\%$/.test(amount)) {
    amountFormat = {
      type: '%',
      val: parseFloat(amount.replace(/(%)$/, ''))
    };
  } else if (/^\-?\d+\.\d+$/.test(amount)) {
    amountFormat = {
      type: 'f',
      val: parseFloat(amount) * 100.0
    };
  } else if (/^\-?\d+$/.test(amount)) {
    amountFormat = {
      type: 'i',
      val: parseInt(amount, 10)
    };
  } else {
    throw new Error(`Unknown amount value ${JSON.stringify(amountFormat)} . Expected percent string, float or integer number.`);
  }

  let val = amountFormat.val / -100;

  if ('%' === amountFormat.type) {
    val = val > 0 ? ((100 - H_S_L.l) * val) / 100 : H_S_L.l * (val / 100);
  }

  H_S_L.l += val;

  R_G_B = HSL2RGB(H_S_L.h, H_S_L.s, H_S_L.l);

  return RGB2HEX(R_G_B.r, R_G_B.g, R_G_B.b);
}

/**
 * 颜色亮化
 *
 * @export
 * @param {string} color
 * @param {string} amount
 * @returns
 */
export function lighten(color: string, amount: string) {
  return darken(color, '-' + amount);
}
