/**
 * Technology stack organized by category and subgroup.
 * Each category represents a domain (Front End, Back End, etc.).
 * Subgroups further classify technologies within each category.
 */
const technologyGroups = [
  {
    category: 'Front End',
    color: 'primary',
    subgroups: [
      {
        label: 'Frameworks',
        technologies: [
          { name: 'Vuejs' },
          { name: 'Knockout' },
          { name: 'SingleSpa-Js' },
        ],
      },
      {
        label: 'Libraries & UI',
        technologies: [
          { name: 'Jquery' },
          { name: 'Kendo' },
          { name: 'RequireJS' },
        ],
      },
    ],
  },
  {
    category: 'Back End',
    color: 'secondary',
    subgroups: [
      {
        label: 'Languages',
        technologies: [
          { name: 'C#/.NET' },
          { name: 'Node.js/TypeScript' },
          { name: 'TypeScript' },
        ],
      },
      {
        label: 'Frameworks',
        technologies: [
          { name: '.NET' },
          { name: 'Express/NestJs' },
          { name: 'Inversify' },
        ],
      },
    ],
  },
  {
    category: 'Database',
    color: 'tertiary',
    subgroups: [
      {
        label: 'Databases',
        technologies: [{ name: 'PostgreSQL' }, { name: 'SQL' }],
      },
      {
        label: 'ORM & Tools',
        technologies: [{ name: 'Slonik' }, { name: 'Entity Framework' }],
      },
    ],
  },
  {
    category: 'DevOps & Cloud',
    color: 'primary',
    subgroups: [
      {
        label: 'Cloud',
        technologies: [{ name: 'AWS' }, { name: 'S3' }],
      },
      {
        label: 'CI/CD & Containers',
        technologies: [{ name: 'Docker' }, { name: 'GitHub Actions' }],
      },
    ],
  },
  {
    category: 'Architecture & Tools',
    color: 'secondary',
    subgroups: [
      {
        label: 'Patterns',
        technologies: [
          { name: 'Domain-Driven Design (DDD)' },
          { name: 'MVVM' },
        ],
      },
      {
        label: 'Tools',
        technologies: [
          { name: 'Jira' },
          { name: 'Pentaho' },
          { name: 'RabbitMQ' },
        ],
      },
    ],
  },
];

export default technologyGroups;
