import { useState } from 'react';
import hero from '../constants/hero';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create mailto link with form data
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${hero.email}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show success message and reset form
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-surface rounded-2xl shadow-lg border border-outline p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-tertiary">
              Get In Touch
            </h2>
            <p className="text-lg text-on-surface-variant">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-on-surface mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-outline bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-on-surface mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-outline bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-on-surface mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-outline bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                placeholder="Your message..."
              />
            </div>

            {status === 'success' && (
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center">
                Opening your email client...
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/80 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant">
              Or email me directly at{' '}
              <a
                href={`mailto:${hero.email}`}
                className="text-primary hover:underline font-medium"
              >
                {hero.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
