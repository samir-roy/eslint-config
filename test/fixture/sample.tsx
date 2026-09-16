import { useCallback, useState } from 'react';

type Status = 'idle' | 'busy';

export const useThing = (): { status: Status; run: () => Promise<void> } => {
  const [status, setStatus] = useState<Status>('idle');

  const run = useCallback(async (): Promise<void> => {
    setStatus('busy');
    await Promise.withResolvers<void>().promise;
    setStatus('idle');
  }, []);

  return { status, run };
};
