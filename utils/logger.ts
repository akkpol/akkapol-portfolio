export type LogAction = 'login' | 'resume-download';

export interface LogEntry {
  timestamp: string;
  action: LogAction;
  email?: string | null;
  metadata?: Record<string, unknown>;
}

// Lazy load Node.js modules to avoid Edge Runtime issues
async function getNodeModules() {
  const [fs, path] = await Promise.all([
    import('fs').then(m => m.promises),
    import('path')
  ]);
  return { fs, path };
}

async function getPaths(path: typeof import('path')) {
  const DATA_DIR = path.join(process.cwd(), 'data');
  const LOG_FILE = path.join(DATA_DIR, 'logs.json');
  return { DATA_DIR, LOG_FILE };
}

// Ensure data directory exists
async function ensureDataDir() {
  const { fs, path } = await getNodeModules();
  const { DATA_DIR } = await getPaths(path);
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readLogs(fs: Awaited<ReturnType<typeof getNodeModules>>['fs'], path: typeof import('path')): Promise<LogEntry[]> {
  try {
    const { LOG_FILE } = await getPaths(path);
    const raw = await fs.readFile(LOG_FILE, 'utf8');
    return JSON.parse(raw) as LogEntry[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error('Error reading logs:', error);
    return [];
  }
}

export async function appendLog(entry: LogEntry) {
  try {
    const { fs, path } = await getNodeModules();
    await ensureDataDir();
    const logs = await readLogs(fs, path);
    logs.push(entry);
    const { LOG_FILE } = await getPaths(path);
    await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing logs:', error);
  }
}

