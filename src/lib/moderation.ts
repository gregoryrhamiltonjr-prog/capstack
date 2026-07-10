/**
 * Chat safety: block sensitive work information and inappropriate content.
 * Ordinary study files and normal conversation are allowed.
 */

export type ModerationResult =
  | { ok: true }
  | { ok: false; reason: string; category: "sensitive" | "inappropriate" | "blocked_file" };

// ---------- Inappropriate language (kept concise; expand as needed) ----------
const PROFANITY =
  /\b(fuck|fucking|fucked|shit|bullshit|asshole|bitch|bastard|dickhead|cunt|slut|whore|nigger|nigga|faggot|retard|kike|chink|spic|tranny)\b/i;

const SEXUAL =
  /\b(porn|porno|onlyfans|nude|nudes|xxx|blowjob|handjob|cumshot|deepthroat|hentai|incest|rape|raping|molest)\b/i;

// ---------- Sensitive work / credential patterns ----------
const SENSITIVE_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\b\d{3}-\d{2}-\d{4}\b/, label: "Social Security numbers" },
  { re: /\b(?:4\d{3}|5[1-5]\d{2}|3[47]\d{2})[ -]?\d{4}[ -]?\d{4}[ -]?\d{1,4}\b/, label: "possible card numbers" },
  { re: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/, label: "AWS access keys" },
  { re: /\bghp_[A-Za-z0-9]{20,}\b/, label: "GitHub tokens" },
  { re: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/, label: "GitHub tokens" },
  { re: /\bsk-(?:live|test|proj)?[_-]?[A-Za-z0-9]{20,}\b/, label: "API secret keys" },
  { re: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/, label: "Slack tokens" },
  { re: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/, label: "private keys" },
  { re: /\b(?:password|passwd|pwd)\s*[:=]\s*\S+/i, label: "passwords in plain text" },
  { re: /\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]\s*\S+/i, label: "credentials" },
  { re: /\b(?:routing|aba)\s*(?:number|#|no\.?)?\s*[:=]?\s*\d{9}\b/i, label: "bank routing numbers" },
  { re: /\b(?:account|acct)\s*(?:number|#|no\.?)?\s*[:=]?\s*\d{6,17}\b/i, label: "bank account numbers" },
  { re: /\bwire\s+instructions\b[\s\S]{0,80}\b\d{6,}\b/i, label: "wire instructions with account data" },
  { re: /\b(?:ssn|social\s*security)\s*[:=#]?\s*\d/i, label: "SSN references with numbers" },
  { re: /\bconfidential\b[\s\S]{0,40}\b(?:loan\s*tape|borrower\s*ssn|tax\s*id|ein\s*[:=])/i, label: "confidential borrower identifiers" },
  { re: /\b(?:do\s*not\s*distribute|internal\s+only|strictly\s+confidential)\b[\s\S]{0,60}\b(?:password|credential|ssn|account\s*#)/i, label: "internal confidential data" },
  { re: /\b(?:mongodb(?:\+srv)?:\/\/|postgres(?:ql)?:\/\/|mysql:\/\/|redis:\/\/)[^\s]+/i, label: "database connection strings" },
  { re: /\bBearer\s+[A-Za-z0-9\-._~+/]+=*/i, label: "bearer tokens" },
];

// File names that almost always hold secrets / work-sensitive material
const BLOCKED_FILENAMES =
  /(?:^|\/)(?:\.env(?:\..+)?|credentials(?:\.[^.]+)?|secrets?(?:\.[^.]+)?|id_rsa|id_ed25519|id_dsa|\.htpasswd|\.netrc|\.npmrc|\.pypirc|serviceAccount(?:Key)?\.json|firebase(?:adminsdk)?.+\.json|.*\.(?:pem|p12|pfx|key|keystore|jks))$/i;

// Extensions we treat as likely secret stores (still allow most other types)
const BLOCKED_EXTENSIONS = new Set([
  ".pem",
  ".p12",
  ".pfx",
  ".key",
  ".keystore",
  ".jks",
  ".kdbx", // password vaults
]);

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB — fair game otherwise

export function moderateText(text: string): ModerationResult {
  const t = text.trim();
  if (!t) return { ok: true };

  if (PROFANITY.test(t) || SEXUAL.test(t)) {
    return {
      ok: false,
      category: "inappropriate",
      reason: "That message looks inappropriate for CapStack. Keep it professional.",
    };
  }

  for (const { re, label } of SENSITIVE_PATTERNS) {
    if (re.test(t)) {
      return {
        ok: false,
        category: "sensitive",
        reason: `Blocked: looks like sensitive work information (${label}). Don't share secrets, credentials, or personal financial identifiers in chat.`,
      };
    }
  }

  return { ok: true };
}

export function moderateFileName(name: string): ModerationResult {
  const base = name.split(/[/\\]/).pop() || name;
  if (BLOCKED_FILENAMES.test(base)) {
    return {
      ok: false,
      category: "blocked_file",
      reason: `Blocked file "${base}": credential or secret store files can't be uploaded to chat.`,
    };
  }
  const ext = base.includes(".") ? `.${base.split(".").pop()!.toLowerCase()}` : "";
  if (ext && BLOCKED_EXTENSIONS.has(ext)) {
    return {
      ok: false,
      category: "blocked_file",
      reason: `Blocked file type (${ext}): private keys and credential stores aren't allowed.`,
    };
  }
  return { ok: true };
}

/** Scan text-like file bodies for secrets / inappropriate content. Binary skips content scan. */
export function moderateFileContent(name: string, mime: string, bytes: Buffer): ModerationResult {
  const nameCheck = moderateFileName(name);
  if (!nameCheck.ok) return nameCheck;

  if (bytes.length > MAX_FILE_BYTES) {
    return { ok: false, category: "blocked_file", reason: "File is too large (max 15 MB)." };
  }

  const isTextLike =
    mime.startsWith("text/") ||
    mime === "application/json" ||
    mime === "application/xml" ||
    mime === "application/javascript" ||
    mime === "application/x-yaml" ||
    mime === "application/yaml" ||
    /\.(txt|md|csv|json|xml|yml|yaml|env|log|ts|tsx|js|jsx|py|rb|go|java|sql|sh|bash|zsh|conf|ini|toml)$/i.test(name);

  if (!isTextLike) {
    // Binary / docs / images / pdf / xlsx etc. — fair game (name already checked)
    return { ok: true };
  }

  // Cap scan size
  const sample = bytes.subarray(0, Math.min(bytes.length, 512_000)).toString("utf8");
  return moderateText(sample);
}

export function sanitizeUploadName(name: string): string {
  const base = (name.split(/[/\\]/).pop() || "file")
    .replace(/[^\w.\-()+ ]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/ +/g, " ")
    .trim();
  return base.slice(0, 120) || "file";
}
