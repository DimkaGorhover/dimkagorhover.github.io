import { AUGUST, DECEMBER } from '../common/dates';

export const exp = () => {
  return {
    id            : 'software_engineer_at_n_ix',
    position      : 'Software Java Engineer',
    company       : { name: 'N-IX', link: 'https://n-ix.com' },
    location      : {
      city   : 'Lviv',
      country: 'Ukraine',
    },
    dates         : {
      start: new Date(2019, AUGUST, 1),
      end  : new Date(2019, DECEMBER, 31),
    },
    description   : [
      `
            I'd been working for the company that provides technology 
            and business services for a number of telecommunications 
            companies as well as a variety of other multinational enterprises.
            `,
    ],
    responsibility: [
      `
            I was a part of the team that worked on implementing 
            a new gateway protocol - SMGP (Short Message Gateway Protocol).
            `, `
            It was necessary not only to implement the task but also 
            to cover all possible cases (unit tests), as well as most of the third-party code.
            `, `
            After that, I was engaged in fixing security vulnerabilities in the project. 
            To find and check such vulnerabilities i have been using tools 
            like "fortify-on-demand" (on production) and SonarQube (on the local subnet).
            `,
    ],
    achievements  : [
      `To reduce the time of callback about vulnerabilities fixes 
            we needed to set up SonarQube as close as possible to our subnet. 
            `,
      `We decided to set up Docker Swarm Cluster on the local Azure Cloud.
            `,
      `As the result, I set up Docker Swarm Cluster 
            with Gitlab (mirrored code from Subversion), 
            Jenkins CI (for scheduling SonarQube tasks, 
                and mirroring Subversion repository to Gitlab), 
                and SonarQube (for report about vulnerabilities fixes) by myself.
                `,
      `Before this, I wasn't familiar close with devops-like tasks. 
            It was interesting experience for me`,
    ],
    techStack     : {
      language  : ['Java 6'],
      build_tool: ['Apache Maven 3.3.1'],
      ci_cd     : ['Jenkins'],
      frameworks: [],
      storage   : [],
      metrics   : [],
      vcs       : ['Subversion (git svn plugin)'],
    },
  };
};
