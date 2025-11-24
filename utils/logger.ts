export type LogAction = 'login' | 'resume-download';

export interface LogEntry {
  timestamp: string;
  action: LogAction;
  email?: string | null;
  metadata?: Record<string, unknown>;
}

export async function appendLog(entry: LogEntry) {
  // In Vercel environment (Serverless/Edge), writing to local file system is ephemeral or not supported.
  // We will log to console instead, which will appear in Vercel Logs.
  console.log('LOG ENTRY:', JSON.stringify(entry, null, 2));
}
