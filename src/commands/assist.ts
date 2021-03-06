import { Dependencies } from '../dependencies';
import * as fs from 'fs';

export let createAssistCommand = (deps: Dependencies) => {
  let { formatter, linter, compiler, nyc, watcher } = deps;

  return {
    execute: () => {
      watcher.watchSourceFileChanged();
      formatter.startVerifying(['source-files-changed']);
      linter.start('format-verified');
      nyc.start();
      compiler.start();
    }
  };
};
