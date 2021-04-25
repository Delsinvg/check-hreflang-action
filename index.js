const core = require('@actions/core');
const github = require('@actions/github');
const axios = require("axios").default;

try {
    const siteUrl = core.getInput("site");
    let regex = /<link rel="alternate" href="([^")]*)" hreflang="([^")]*)">/g
    axios
    .get(siteUrl)
    .then(function (response) {
      let hreflang = response.data.match(
        regex
      );


      console.log(hreflang)

    //   if (! hreflang) {
    //     core.setFailed("No hreflang tag on page");
    //   }

    //   if (favicon) {
    //     let faviconUrl = getHref(favicon[0])
    //     core.setOutput("favicon", faviconUrl);
    //   }
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (error) {
  core.setFailed(error.message);
}

function getHref(href) {
    let start_pos = href.indexOf("href=\"") + 6;
    let end_pos = href.indexOf("\"", start_pos);
    return resultHref = href.substring(start_pos, end_pos);
  }