// Shared constants for the repo contract.

export const CORE_SKILLS = [
  'qa-mode',
  'qa-setup',
  'qa-ask',
  'qa-delegate',
  'qa-session',
  'qa-repro',
  'qa-diagnose',
  'qa-bdd',
  'qa-file',
  'qa-verify',
  'qa-regression',
  'qa-explore',
  'qa-browser',
  'qa-gate',
];

export const EXTENDED_SKILLS = [];
export const DOMAIN_SKILLS = [];
export const EXPERIMENTAL_SKILLS = [];

export const LINE_BUDGETS = {
  'qa-mode': 300,
  'qa-setup': 160,
  'qa-ask': 120,
  'qa-delegate': 130,
  'qa-session': 130,
  'qa-repro': 130,
  'qa-diagnose': 120,
  'qa-bdd': 150,
  'qa-file': 140,
  'qa-verify': 120,
  'qa-regression': 110,
  'qa-explore': 120,
  'qa-browser': 130,
  'qa-gate': 110,
};

export const PRINCIPLE_BUDGET = 30;
export const PLAYBOOK_BUDGET = 45;
export const AGENT_BUDGET = 110;
export const STANDARD_BUDGET = 70;

export const PLAYBOOKS = [
  'bug-intake',
  'investigate',
  'fix-verify',
  'exploratory-pass',
  'release-gate',
  'browser-pass',
];

export const STANDARDS = [
  'evidence-standard',
  'issue-standard',
  'scenario-standard',
];

export const PRINCIPLE_GROUPS = {
  Discipline: [
    'reproduce-before-you-trust',
    'one-variable-at-a-time',
    'quarantine-flakes',
  ],
  Reporting: [
    'report-behavior-not-code',
    'thin-issues',
    'cite-or-delete',
  ],
  Verification: [
    'prove-the-fix',
    'fresh-eyes-find-bugs',
    'gate-before-release',
  ],
};

export const PRINCIPLE_TITLES = {
  'reproduce-before-you-trust': 'Reproduce Before You Trust',
  'one-variable-at-a-time': 'One Variable at a Time',
  'quarantine-flakes': 'Quarantine Flakes',
  'report-behavior-not-code': 'Report Behavior, Not Code',
  'thin-issues': 'Thin Issues',
  'cite-or-delete': 'Cite or Delete',
  'prove-the-fix': 'Prove the Fix',
  'fresh-eyes-find-bugs': 'Fresh Eyes Find Bugs',
  'gate-before-release': 'Gate Before Release',
};

export const AGENTS = [
  'qa-issue-reviewer',
  'qa-browser-driver',
  'qa-explorer',
];

export const ADAPTERS = [
  'claude-code',
  'codex',
  'cursor',
  'opencode',
  'agent-teams',
  'omp',
  'deepseek-harness',
];
