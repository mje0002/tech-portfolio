import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

const navlinks = [
  {
    id: 'about',
    title: 'About',
    component: About,
  },
  {
    id: 'experience',
    title: 'Experience',
    component: Experience,
  },
  {
    id: 'projects',
    title: 'Projects',
    component: Projects,
  },
  {
    id: 'skills',
    title: 'Skills',
    component: Skills,
  },
  {
    id: 'contact',
    title: 'Contact',
    component: Contact,
  },
];

export default navlinks;
