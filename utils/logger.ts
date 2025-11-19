import { promises as fs } from 'fs';
import path from 'path';

export type LogAction = 'login' | 'resume-download';

export interface LogEntry {
  timestamp: string;
  action: LogAction;
  email?: string | null;
  metadata?: Record<string, unknown>;
}

const LOG_FILE = path.join(process.cwd(), 'data', 'logs.json');

async function readLogs(): Promise<LogEntry[]> {
  try {
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
    const logs = await readLogs();
    logs.push(entry);
    await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing logs:', error);
  }
}

