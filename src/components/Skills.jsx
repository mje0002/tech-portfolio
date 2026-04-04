import { motion } from 'framer-motion';
import technologyGroups from '../constants/technology';

/**
 * A single fixed-size technology card. Subtle lift on hover.
 */
const TechCard = ({ tech }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={
        'bg-surface rounded-xl border-2 border-outline ' +
        'shadow-md hover:border-primary hover:shadow-lg ' +
        'hover:shadow-primary/20 dark:hover:shadow-primary/30 ' +
        'p-4 w-28 h-28 flex flex-col items-center ' +
        'justify-center text-center select-none ' +
        'transition-colors duration-200'
      }
    >
      <div
        className={
          'w-9 h-9 mb-2 rounded-lg bg-gradient-to-br ' +
          'from-primary/20 to-secondary/20 ' +
          'dark:from-primary/30 dark:to-secondary/30 ' +
          'flex items-center justify-center'
        }
      >
        <span className="text-lg font-bold text-primary">
          {tech.name.charAt(0)}
        </span>
      </div>
      <span
        className={
          'text-xs font-semibold text-on-surface ' +
          'leading-tight line-clamp-2'
        }
      >
        {tech.name}
      </span>
    </motion.div>
  );
};

/**
 * A subgroup of technology cards displayed as an
 * inline horizontal row (like a fanned-out deck).
 */
const CardStack = ({ subgroup, groupIndex }) => {
  const { label, technologies } = subgroup;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.4,
        delay: groupIndex * 0.08,
      }}
      className="flex flex-col items-start"
    >
      <span
        className={
          'text-xs font-medium uppercase ' +
          'tracking-wider text-on-surface-variant mb-2'
        }
      >
        {label}
      </span>

      {/* Cards in a horizontal row with overlap */}
      <div className="flex -space-x-3">
        {technologies.map((tech, idx) => (
          <div key={tech.name} className="relative" style={{ zIndex: idx }}>
            <TechCard tech={tech} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

/**
 * A full category row containing one or more card stacks (subgroups).
 */
const CategoryRow = ({ group, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-16"
    >
      {/* Category heading */}
      <h3
        className={
          'text-xl md:text-2xl font-bold text-on-surface ' +
          'mb-6 text-center md:text-left'
        }
      >
        {group.category}
      </h3>

      {/* Subgroup stacks laid out horizontally */}
      <div
        className={
          'flex flex-wrap justify-center ' + 'md:justify-start gap-12 md:gap-16'
        }
      >
        {group.subgroups.map((subgroup, subIdx) => (
          <CardStack
            key={subgroup.label}
            subgroup={subgroup}
            groupIndex={subIdx}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-tertiary">
            Skills & Technologies
          </h2>
          <p
            className={'text-lg text-on-surface-variant ' + 'max-w-2xl mx-auto'}
          >
            A comprehensive toolkit of modern technologies and frameworks I use
            to build scalable, efficient applications.
          </p>
        </motion.div>

        {/* Category rows */}
        {technologyGroups.map((group, idx) => (
          <CategoryRow key={group.category} group={group} index={idx} />
        ))}

        {/* Decorative blurs */}
        <motion.div
          className={
            'absolute top-10 left-10 w-20 h-20 ' +
            'rounded-full bg-primary/10 dark:bg-primary/20 ' +
            'blur-2xl pointer-events-none'
          }
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className={
            'absolute bottom-10 right-10 w-32 h-32 ' +
            'rounded-full bg-secondary/10 dark:bg-secondary/20 ' +
            'blur-2xl pointer-events-none'
          }
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </section>
  );
};

export default Skills;
