/**
 * Strategy Flow plugin for OpenCode.ai
 *
 * Injects the strategy-flow bootstrap context via message transform.
 * Auto-registers the local skills directory via config hook.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content: body };
};

let bootstrapCache = undefined;

export const StrategyFlowPlugin = async () => {
  const skillsDir = path.resolve(__dirname, '../../skills');

  const getBootstrapContent = () => {
    if (bootstrapCache !== undefined) return bootstrapCache;

    const skillPath = path.join(skillsDir, 'strategy-flow', 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      bootstrapCache = null;
      return null;
    }

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);

    bootstrapCache = `<EXTREMELY_IMPORTANT>
You have Strategy Flow available.

The router skill content below is already loaded. Do not try to load the same router again through the skill tool unless the harness explicitly requires it.

${content}

Strategy Flow is a methodology layer for TSLab strategy development. It does not replace the active workspace's TSLab Web API instructions, helper scripts, or localhost workflow.
</EXTREMELY_IMPORTANT>`;

    return bootstrapCache;
  };

  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }
    },

    'experimental.chat.messages.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (!bootstrap || !output.messages.length) return;

      const firstUser = output.messages.find((m) => m.info.role === 'user');
      if (!firstUser || !firstUser.parts.length) return;

      if (firstUser.parts.some((p) => p.type === 'text' && p.text.includes('EXTREMELY_IMPORTANT'))) {
        return;
      }

      const ref = firstUser.parts[0];
      firstUser.parts.unshift({ ...ref, type: 'text', text: bootstrap });
    }
  };
};
