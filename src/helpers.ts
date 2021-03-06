import { execSync } from 'child_process';

export let findChangedFiles = (refA?: string, refB?: string) => {
  if (refA === undefined) {
    refA = 'HEAD';
  }
  if (refB === undefined) {
    refB = '';
  }

  let output = execSync(`git diff --name-only --diff-filter=ACMR ${refA} ${refB}`, { encoding: 'utf8' });
  return output.split('\n').filter(fileName => fileName.length > 0);
};

export let npmInstall = () => {
  execSync('npm install', { encoding: 'UTF-8', stdio: [0, 1, 2] });
  execSync('npm dedupe', { encoding: 'UTF-8', stdio: [0, 1, 2] });
};

export let packageJsonChanged = (refA: string, refB: string) => findChangedFiles(refA, refB).filter(f => f.indexOf('package.json') !== -1).length >= 1;

export let filterTsFiles = (files: string[]) => {
  return files.filter(f => f.slice(-3) === '.ts' && f.slice(-5) !== '.d.ts');
};
