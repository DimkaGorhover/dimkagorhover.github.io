import * as Icons from '../components/icons';

export const mail = (() => {
  const icon = <Icons.Mail />;
  return {
    important: true,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {' Email ( gd.mail.89@gmail.com )'}
      </span>
    ),
    link: 'mailto:gd.mail.89@gmail.com',
  };
})();

export const skype = (() => {
  const icon = <Icons.Skype />;
  return {
    important: true,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {' Skype ( dier_89 )'}
      </span>
    ),
    link: 'skype:dier_89',
  };
})();

export const linkedIn = (() => {
  const icon = <Icons.LinkedIn />;
  return {
    important: true,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {' LinkedIn ( dmitriy-gorkhover )'}
      </span>
    ),
    link: 'https://www.linkedin.com/in/dmitriy-gorkhover/',
  };
})();

export const github = (() => {
  const icon = <Icons.Github />;
  return {
    important: false,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {' Github'}
      </span>
    ),
    link: 'https://github.com/DimkaGorhover',
  };
})();

export const telegram = (() => {
  const icon = <Icons.Telegram />;
  return {
    important: false,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {' Telegram'}
      </span>
    ),
    link: 'https://t.me/hdmytro',
  };
})();

export const twitter = (() => {
  const icon = <Icons.Twitter />;
  return {
    important: false,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {` Twitter`}
      </span>
    ),
    link: 'https://twitter.com/dghover',
  };
})();

export const facebook = (() => {
  const icon = <Icons.Facebook />;
  return {
    important: false,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {` Facebook`}
      </span>
    ),
    link: 'https://www.facebook.com/dmitriy.gorhover',
  };
})();

export const leetCode = (() => {
  const icon = <Icons.LeetCode />;
  return {
    important: false,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {` LeetCode`}
      </span>
    ),
    link: 'https://leetcode.com/dimkagorhover/',
  };
})();

export const hackerRank = (() => {
  const icon = <Icons.HackerRank />;
  return {
    important: false,
    target: '_blank',
    icon: icon,
    name: (
      <span>
        {icon}
        {` HackerRank`}
      </span>
    ),
    link: 'https://www.hackerrank.com/gd_mail_89',
  };
})();

const contacts = [mail, skype, linkedIn, github, telegram, twitter, facebook, leetCode, hackerRank];

export default contacts;
