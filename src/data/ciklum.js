import { JULY, NOVEMBER } from '../common/dates';

export const exp = () => {
  return {
    id         : 'software_engineer_at_ciklum',
    position   : 'Java Developer',
    company    : { name: 'Ciklum', link: 'https://ciklum.com' },
    excess     : true,
    links      : [
      { name: 'Ciklum.com', url: 'https://www.ciklum.com' },
      {
        name  : 'CV: Software Engineer at LoopMe',
        url   : '#software_engineer_at_loopme',
        target: '_self',
      },
    ],
    description: `
            I’d been working on LoopMe project when it was Ciklum's outstaff project.
            More details in "Software Engineer at LoopMe".
            `,
    location   : {
      city   : 'Dnipro',
      country: 'Ukraine',
    },
    dates      : {
      start: new Date(2014, JULY, 1),
      end  : new Date(2015, NOVEMBER, 1),
    },
  };
};
