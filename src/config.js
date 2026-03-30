module.exports = {
  name:    'Zeng Jia',
  email:   'jiazeng1918@outlook.com',
  siteUrl: 'https://zane1918.github.io',

  socialMedia: [
    { name: 'GitHub',   url: 'https://github.com/Zane1918' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jia-zeng-a88364254' },
  ],

  navLinks: [
    { name: 'About',      url: '/#about' },
    { name: 'Experience', url: '/#experience' },
    { name: 'Work',       url: '/#projects' },
    { name: 'Blog',       url: '/blog' },
    { name: 'Contact',    url: '/#contact' },
  ],

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
  }),
}
