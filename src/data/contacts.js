import React from 'react';

import {
  FaFacebook as FacebookIcon,
  FaGithub as GithubIcon,
  FaLinkedin as LinkedInIcon,
  FaSkype as SkypeIcon,
  FaTelegram as TelegramIcon,
  FaTwitter as TwitterIcon,
} from 'react-icons/fa';

import { FiMail as MailIcon } from 'react-icons/fi';

import { SiHackerrank as HackerRankIcon, SiLeetcode as LeetCodeIcon } from 'react-icons/si';

export const mail = ((() => {
  const icon = <MailIcon />;
  return {
    important: true,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{' Email ( gd.mail.89@gmail.com )'}</span>,
    link     : 'mailto:gd.mail.89@gmail.com',
  };
})());

export const skype = ((() => {
  const icon = <SkypeIcon />;
  return {
    important: true,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{' Skype ( dier_89 )'}</span>,
    link     : 'skype:dier_89',
  };
})());

export const linkedIn = ((() => {
  const icon = <LinkedInIcon />;
  return {
    important: true,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{' LinkedIn ( dmitriy-gorkhover )'}</span>,
    link     : 'https://www.linkedin.com/in/dmitriy-gorkhover/',
  };
})());

export const github = ((() => {
  const icon = <GithubIcon />;
  return {
    important: false,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{' Github'}</span>,
    link     : 'https://github.com/DimkaGorhover',
  };
})());

export const telegram = ((() => {
  const icon = <TelegramIcon />;
  return {
    important: false,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{' Telegram'}</span>,
    link     : 'https://t.me/hdmytro',
  };
})());

export const twitter = ((() => {
  const icon = <TwitterIcon />;
  return {
    important: false,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{` Twitter`}</span>,
    link     : 'https://twitter.com/dghover',
  };
})());

export const facebook = ((() => {
  const icon = <FacebookIcon />;
  return {
    important: false,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{` Facebook`}</span>,
    link     : 'https://www.facebook.com/dmitriy.gorhover',
  };
})());


export const leetCode = (() => {
  const icon = <LeetCodeIcon />;
  return {
    important: false,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{` LeetCode`}</span>,
    link     : 'https://leetcode.com/dimkagorhover/',
  };
})();

export const hackerrank = (() => {
  const icon = <HackerRankIcon />;
  return {
    important: false,
    target   : '_blank',
    icon     : icon,
    name     : <span>{icon}{` HackerRank`}</span>,
    link     : 'https://www.hackerrank.com/gd_mail_89',
  };
})();

const contacts = [
  mail,
  skype,
  linkedIn,

  github,
  telegram,
  twitter,
  facebook,
  leetCode,
  hackerrank,
];

export default contacts;
