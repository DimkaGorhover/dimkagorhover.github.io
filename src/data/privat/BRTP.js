import { JULY } from '../../common/dates';

export const exp = () => {
  return {
    id            : 'brtp_middle_software_engineer',
    position      : 'Middle Software Engineer',
    company       : { name: 'Privat Bank', link: 'https://privatbank.ua' },
    location      : {
      city   : 'Dnipro',
      country: 'Ukraine',
    },
    dates         : {
      start: new Date(2013, JULY, 1),
      end  : new Date(2014, JULY, 30),
    },
    description   : [
      'I’d been developing internal web projects for the business department',
    ],
    techStack     : {
      language  : ['Java (Versions: 6, 7, 8)', 'JavaScript'],
      frameworks: ['Spring 3', 'jQuery', 'Angular 1'],
      build_tool: ['Apache Maven'],
      ci_cd     : ['Jenkins'],
      storage   : ['PostgreSQL', 'Redis'],
      vcs       : ['Gitolite'],
      metrics   : [],
    },
    responsibility: [],
  };
};
