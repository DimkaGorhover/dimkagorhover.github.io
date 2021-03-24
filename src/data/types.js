import PropTypes from 'prop-types';

export const Location = PropTypes.shape({
  city   : PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
});

export const Company = PropTypes.shape({
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
});

export const TechStack = PropTypes.shape({
  language  : PropTypes.arrayOf(PropTypes.string).isRequired,
  frameworks: PropTypes.arrayOf(PropTypes.string),
  prod_env  : PropTypes.arrayOf(PropTypes.string),
  build_tool: PropTypes.arrayOf(PropTypes.string),
  ci_cd     : PropTypes.arrayOf(PropTypes.string),
  storage   : PropTypes.arrayOf(PropTypes.string),
  metrics   : PropTypes.arrayOf(PropTypes.string),
  vcs       : PropTypes.arrayOf(PropTypes.string),
});

export const Dates = PropTypes.shape({
  start: PropTypes.any.isRequired,
  end  : PropTypes.any,
});

export const Experience = PropTypes.shape({
  index         : PropTypes.number,
  id            : PropTypes.string,
  position      : PropTypes.string.isRequired,
  company       : Company.isRequired,
  location      : Location.isRequired,
  dates         : Dates.isRequired,
  description   : PropTypes.arrayOf(PropTypes.string),
  responsibility: PropTypes.arrayOf(PropTypes.string),
  techStack     : TechStack.isRequired,

});

Experience.inner = PropTypes.arrayOf(Experience);
