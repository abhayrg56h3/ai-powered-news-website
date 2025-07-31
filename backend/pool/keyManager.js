// =================== keyManager.js ===================
class KeyManager {
  constructor(keys = [], cooldownMs = 4 * 60 * 60 * 1000, maxRetries = 3) {
    this.keys = keys;
    this.cooldownMs = cooldownMs;
    this.maxRetries = maxRetries;
    this.index = 0;
    this.exhaustedAt = 0;
  }

  get now() {
    return Date.now();
  }

  get inCooldown() {
    return (this.now - this.exhaustedAt) < this.cooldownMs;
  }

  get currentKey() {
    if (!this.keys.length) return null;
    return this.keys[this.index % this.keys.length];
  }

  markExhausted() {
    this.exhaustedAt = this.now;
    console.error('❌ All API keys exhausted. Cooling down until', new Date(this.exhaustedAt + this.cooldownMs).toISOString());
  }

  rotate() {
    this.index = (this.index + 1) % this.keys.length;
  }

  async withKey(fn) {
    if (!this.keys.length) {
      throw new Error('NO_API_KEYS_CONFIGURED');
    }
    if (this.inCooldown) {
      throw new Error('API_KEYS_IN_COOLDOWN');
    }

    let lastErr;
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      const key = this.currentKey;
      if (!key) break;
      try {
        return await fn(key);
      } catch (err) {
        lastErr = err;
        const isRateLimit = err.response?.status === 429 || err.response?.data?.message?.includes('free-models-per-day');
        if (isRateLimit || err.code === 'ECONNABORTED') {
          console.warn(`🚫 Key ${this.index} failed (${err.code || err.response?.status}), rotating...`);
          this.rotate();
        } else {
          throw err;
        }
      }
    }
    this.markExhausted();
    throw lastErr;
  }
}

const apiKeys = [
  process.env.OPENROUTER_API_KEY_1,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
  process.env.OPENROUTER_API_KEY_4,
  process.env.OPENROUTER_API_KEY_5,
  process.env.OPENROUTER_API_KEY_6,
  process.env.OPENROUTER_API_KEY_7,
  process.env.OPENROUTER_API_KEY_8,
  process.env.OPENROUTER_API_KEY_9,
  process.env.OPENROUTER_API_KEY_10,
  process.env.OPENROUTER_API_KEY_11,
  process.env.OPENROUTER_API_KEY_12,
  process.env.OPENROUTER_API_KEY_13,
  process.env.OPENROUTER_API_KEY_14,
  process.env.OPENROUTER_API_KEY_15
].filter(Boolean);

const keyManager = new KeyManager(apiKeys, 4 * 60 * 60 * 1000, 3);
export default keyManager;