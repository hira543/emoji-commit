#!/usr/bin/env bun
import { program } from 'commander';
import inquirer from 'inquirer';
const { prompt } = inquirer;
import { execSync } from 'child_process';

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log("Error: No changes added to commit. Please 'git add' some files.");
      process.exit(1);
    }
  } catch (error) {
    if (error.message.includes('not a git repository')) {
      console.log('Error: Not a git repository (or any of the parent directories).');
      process.exit(1);
    }
    throw error; 
  }
}

program.description('An emoji commit CLI tool');

program.action(async () => {
  checkGitStatus(); 

  const answers = await prompt([
    {
      type: 'list',
      name: 'emoji',
      message: 'Choose your emoji:',
      choices: [
        { name: '🐛 Bugfix', value: '🐛' },
        { name: '✨ Feature', value: '✨' },
        { name: '📚 Documentation', value: '📚' },
        { name: '⚡ Performance', value: '⚡' },
        { name: '🚀 Release', value: '🚀' },
        { name: '🎉 Celebrate', value: '🎉' },
        { name: '💚 Fix CI Build', value: '💚' },
        { name: '♻️ Refactor Code', value: '♻️' },
        { name: '➕ Add Dependency', value: '➕' },
        { name: '➖ Remove Dependency', value: '➖' },
        { name: '🔧 Adjust Configuration', value: '🔧' },
        { name: '📦 Update Packages', value: '📦' },
        { name: '🌱 Add Seed Data', value: '🌱' },
        { name: '🏷️ Improve Types', value: '🏷️' },
        { name: '💫 Multiple Changes', value: '💫' },
        { name: '📝 Update Docs', value: '📝' }
      ]
    },
    {
      type: 'input',
      name: 'message',
      message: 'Enter your commit message:'
    }
  ]);

  try {
    const commitCommand = `git commit -m "${answers.emoji} ${answers.message}"`;
    execSync(commitCommand, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to commit:', error.message);
    process.exit(1);
  }
});

program.parse(process.argv);
