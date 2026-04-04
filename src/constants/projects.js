import { github } from '../assets';

const projects = [
  {
    name: 'Pull Request Extension',
    description:
      'A Chrome extension that enhances the GitHub experience by providing real-time insights and analytics on pull requests, helping developers streamline their code review process and improve collaboration.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'typescript',
        color: 'green-text-gradient',
      },
      {
        name: 'material-ui',
        color: 'pink-text-gradient',
      },
      {
        name: 'octokit',
        color: 'orange-text-gradient',
      },
    ],
    image: github,
    source_code_link: 'https://github.com/mje0002/github-extension',
  },
  {
    name: 'Github Metrics Api',
    image: github,
    description:
      'A RESTful API built with Node.js and Express that provides detailed metrics and insights for GitHub repositories, including commit history, contributor statistics, and issue tracking.',
    tags: [
      {
        name: 'nodejs',
      },
      {
        name: 'express',
      },
      {
        name: 'inversifyJS',
      },
      {
        name: 'docker',
      },
      {
        name: 'typescript',
      },
    ],
  },
];

export default projects;
