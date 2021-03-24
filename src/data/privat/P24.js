import { FEBRUARY, JULY } from '../../common/dates';

const p24ukraine = () => {
  return {
    id            : 'privat24_ukraine',
    name          : 'Privat24 Ukraine',
    showDates     : false,
    dates         : {
      start: new Date(2012, FEBRUARY, 28),
      end  : new Date(2013, JULY, 1),
    },
    location      : {
      city   : 'Dnipro',
      country: 'Ukraine',
    },
    description   : [],
    responsibility: [
      'New small features, support current features, bugfix, unit testing, etc.',
    ],
    techStack     : {
      language  : ['Java 6', 'JavaScript'],
      frameworks: ['Java EE (EJB, Resin)', 'jQuery', 'Backbone'],
      build_tool: ['Apache Ant'],
      ci_cd     : ['Jenkins'],
      storage   : ['Sybase', 'Redis', 'RabbitMQ'],
      vcs       : ['Subversion'],
    },
  };
};

const p24georgia = () => {
  return {
    id            : 'privat24_georgia',
    name          : 'Privat24 Georgia',
    showDates     : false,
    dates         : {
      start: new Date(2012, FEBRUARY, 28),
      end  : new Date(2013, JULY, 1),
    },
    location      : {
      city   : 'Dnipro',
      country: 'Ukraine',
    },
    achievements  : [`
            I spend 4 weekends (mostly nights) and migrated this project 
            from an old stack of technology (Java 6 + Apache Ant) 
            to a new one (Java 7 + Spring + Apache Maven + Git).
            `, `
            Unfortunately, there weren't mentors to help me. 
            And based on my lack of knowledge it was very stressful for me, 
            but as a result, I got a great experience that I remember nowadays.
            `],
    responsibility: [`
            Develop and support internet banking web application, same as Privat24 Ukraine
            `],
    description   : '',
    techStack     : {
      language  : ['Java 6', 'JavaScript'],
      frameworks: ['Java EE (EJB, Resin)', 'jQuery', 'Spring 3', 'jQuery'],
      build_tool: 'Netbeans’ Apache Ant scripts → Apache Maven',
      ci_cd     : ['Jenkins'],
      storage   : ['Sybase', 'Redis', 'RabbitMQ'],
      vcs       : ['Subversion', 'Git (Gitlab)'],
    },
  };
};

const p24abank = () => {
  return {
    id            : 'privat24_a_bank',
    name          : 'Privat24 A-Bank',
    showDates     : false,
    dates         : {
      start: new Date(2012, FEBRUARY, 28),
      end  : new Date(2013, JULY, 1),
    },
    location      : {
      city   : 'Dnipro',
      country: 'Ukraine',
    },
    responsibility: [`
            Develop and support internet banking web application, same as Privat24 Ukraine
            `],
    description   : '',
    techStack     : {
      language  : ['Java 6, JavaScript'],
      frameworks: ['Java EE (EJB), jQuery'],
      prod_env  : ['custom'],
      build_tool: ['Netbeans’ Ant scripts'],
      ci_cd     : ['Jenkins'],
      storage   : ['Sybase, Redis, RabbitMQ'],
      vcs       : ['Subversion'],
      metrics   : [],
    },
  };
};

export const exp = () => {

  const __p24ukraine = p24ukraine();
  const __p24georgia = p24georgia();
  const __p24abank = p24abank();

  return {
    id            : 'software_engineer_at_privat_bank',
    position      : 'Junior Software Engineer',
    company       : { name: 'Privat24 (Privat Bank)', link: 'https://privat24.ua' },
    links         : [
      { name: 'PrivatBank.ua', url: 'https://privatbank.ua' },
      { name: 'Privat24.ua', url: 'https://privat24.ua' },
    ],
    description   : [
      `I was a member of the team that developed and 
            modernized Ukrainian local internet banking system Privat24`,
    ],
    responsibility: [`
            Small features (clinet messages counters, form "don't block credit card abroad", etc.),
            support, bugfixing, unit testing, etc.
            `],
    location      : {
      city   : 'Dnipro',
      country: 'Ukraine',
    },
    dates         : {
      start: __p24ukraine.dates.start,
      end  : __p24georgia.dates.end,
    },
    techStack     : {
      language  : ['Java (Versions: 6, 7, 8)', 'JavaScript'],
      frameworks: ['Java EE', 'EJB', 'Spring 3', 'jQuery', 'Angular 1'],
      build_tool: ['Apache Ant', 'Apache Maven'],
      ci_cd     : ['Jenkins'],
      storage   : ['Sybase', 'Redis', 'RabbitMQ'],
      vcs       : ['Subversion', 'Gitlab'],
      metrics   : ['Zabbix'],
    },
    inner         : [
      __p24ukraine,
      __p24georgia,
      __p24abank,
    ],
  };
};
