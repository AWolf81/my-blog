import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';

import styled from 'styled-components';

import { COLORS } from '../../constants';

const SHARE_DEFAULTS = {
  size: 32,
  round: false,
};

const Share = ({ socialConfig, tags }) => (
  <Wrapper>
    <FacebookShareButton url={socialConfig.config.url}>
      <FacebookIcon round={SHARE_DEFAULTS.round} size={SHARE_DEFAULTS.size} />
    </FacebookShareButton>

    <TwitterShareButton
      url={socialConfig.config.url}
      title={socialConfig.config.title}
      via={socialConfig.twitterHandle.split('@').join('')}
      hashtags={tags}
    >
      <TwitterIcon round={SHARE_DEFAULTS.round} size={SHARE_DEFAULTS.size} />
      {/* <span className="text">Twitter</span> */}
    </TwitterShareButton>
    <LinkedinShareButton
      url={socialConfig.config.url}
      title={socialConfig.config.title}
    >
      <LinkedinIcon round={SHARE_DEFAULTS.round} size={SHARE_DEFAULTS.size} />
      {/* <span className="text">LinkedIn</span> */}
    </LinkedinShareButton>
    <RedditShareButton
      url={socialConfig.config.url}
      title={socialConfig.config.title}
    >
      <RedditIcon round={SHARE_DEFAULTS.round} size={SHARE_DEFAULTS.size} />
      {/* <span className="text">Reddit</span> */}
    </RedditShareButton>
    <WhatsappShareButton
      url={socialConfig.config.url}
      title={socialConfig.config.title}
    >
      <WhatsappIcon round={SHARE_DEFAULTS.round} size={SHARE_DEFAULTS.size} />
      {/* <span className="text">WhatsApp</span> */}
    </WhatsappShareButton>
    <EmailShareButton
      url={socialConfig.config.url}
      subject={socialConfig.config.title}
    >
      <EmailIcon round={SHARE_DEFAULTS.round} size={SHARE_DEFAULTS.size} />
    </EmailShareButton>
  </Wrapper>
);

const Wrapper = styled.div`
  z-index: +1;
  margin-top: 2em;
  padding: 0.5em;
  background: ${COLORS.lightGray[100]};
  .SocialMediaShareButton {
    display: inline-block;
    text-align: center;
    padding: 0.5em;
    & :hover {
      filter: brightness(120%);
    }
  }

  @media (min-width: 600px) {
    position: relative;
  }

  @media (min-width: 1400px) {
    position: fixed;
    background: rgba(255, 255, 255, 0.7);
    width: 50px;
    top: 1%;
    right: 5%;
  }
`;

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};
Share.defaultProps = {
  tags: [],
};

export default Share;
