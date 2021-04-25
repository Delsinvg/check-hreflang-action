const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios").default;

try {
  const siteUrl = core.getInput("site");
  let regex = /<link ([^<]+)? rel="alternate" ([^<]+)?>/g;
  axios
    .get(siteUrl)
    .then(function (response) {
      let hreflang = response.data.match(regex);


      if (!hreflang) {
        core.setFailed("No hreflang tag on page");
      }

      if (hreflang) {
        let hreflangUrls = [];
        for (let i = 0; i < hreflang.length; i++) {
          hreflangUrls.push(getHref(hreflang[i]));
        }
        core.setOutput("hreflang", hreflangUrls);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
} catch (error) {
  core.setFailed(error.message);
}

function getHref(href) {
  let start_pos = href.indexOf('href="') + 6;
  let end_pos = href.indexOf('"', start_pos);
  return (resultHref = href.substring(start_pos, end_pos));
}
