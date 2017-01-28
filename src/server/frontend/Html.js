/* eslint-disable react/no-danger */
import React from 'react';

const GoogleAnalytics = ({ id }) => (
  <script
    dangerouslySetInnerHTML={{ __html: `
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', '${id}', 'auto'); ga('send', 'pageview');`,
    }}
  />
);

GoogleAnalytics.propTypes = {
  id: React.PropTypes.string.isRequired,
};

const Html = ({
  appCssFilename,
  bodyHtml,
  googleAnalyticsId,
  helmet,
  isProduction,
}) => (
  <html {...helmet.htmlAttributes.toComponent()}>
  <head>
    <meta charSet="utf-8" />
    <meta content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0" name="viewport" />
    <meta content="ie=edge" httpEquiv="x-ua-compatible" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,800&amp;subset=cyrillic" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    {helmet.title.toComponent()}
    {helmet.base.toComponent()}
    {helmet.meta.toComponent()}
    {helmet.link.toComponent()}
    {helmet.script.toComponent()}
    {appCssFilename &&
    <link href={appCssFilename} rel="stylesheet" />
    }
    {isProduction && googleAnalyticsId !== 'UA-XXXXXXX-X' &&
    <GoogleAnalytics id={googleAnalyticsId} />
    }
  </head>
  <body
    dangerouslySetInnerHTML={{ __html: bodyHtml }}
  />
  </html>
);

// TODO: Use babel-plugin-flow-react-proptypes one day.
Html.propTypes = {
  appCssFilename: React.PropTypes.string,
  bodyHtml: React.PropTypes.string.isRequired,
  googleAnalyticsId: React.PropTypes.string.isRequired,
  helmet: React.PropTypes.object.isRequired,
  isProduction: React.PropTypes.bool.isRequired,
};

export default Html;
