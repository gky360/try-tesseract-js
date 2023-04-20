import { useEffect, useState } from 'react';
import { createWorker, Worker } from 'tesseract.js';

export interface RecognizerProps {}

export const Recognizer = ({}: RecognizerProps): JSX.Element | null => {
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    (async () => {
      const aWorker = await createWorker({
        logger: (m) => console.log(m),
      });
      setWorker(aWorker);
    })();
  }, []);

  useEffect(() => {
    if (!worker) {
      return;
    }
    (async () => {
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(
        'https://tesseract.projectnaptha.com/img/eng_bw.png'
      );
      console.log(text);
      await worker.terminate();
    })();
  }, [worker]);

  return <div>Recognizer</div>;
};
