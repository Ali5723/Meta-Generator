function printFormData(event) {
  let data = {};
  let result = "";
  let metaTags = [];
  /* Get Form Data */
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  for (const [name, value] of formData.entries()) {
    data[name] = value;
  }
  data["viewport"] = "width=device-width, initial-scale=1.0";
  data["content-type"] = `text/html; charset=${data["charset"]}`;
  data["charset"] = null;
  data["type"] = "website";
  data["card"] = "summary_large_image";

  /* Function To Automatic Create Meta Tags */
  function generateMetaTags(metaName, metaType) {
    let metaValue = data[metaName];
    if (metaValue == "" || metaValue == 0 || metaValue == null) {
      return null;
    } else {
      switch (metaType) {
        /** Classic Meta Tag */
        case 0:
          return `<meta name="${metaName}" content="${metaValue}"></meta>`;
          break;

        /** Open Graph Meta Tag */
        case 1:
          return `<meta property="og:${metaName}" content="${metaValue}"></meta>`;
          break;

        /** Twitter Meta Tag */
        case 2:
          return `<meta name="twitter:${metaName}" content="${metaValue}"></meta>`;
          break;

        /** Special Meta Tags */
        /*** "Title" Meta Tag */
        case 3:
          return [
            `<title>${metaValue}</title>`,
            `<meta name="${metaName}" content="${metaValue}"></meta>`,
          ].join("\n");
          break;

        /*** "Content-Type" Meta Tag */
        case 4:
          return `<meta http-equiv="Content-Type" content="${metaValue}"></meta>`;
          break;

        /*** "revisit-after" Meta Tag */
        case 5:
          return `<meta name="${metaName}" content="${metaValue} days"></meta>`;
          break;

        default:
          return null;
          break;
      }
    }
  }
  /* Generate Meta Tags */
  console.log(data);
  metaTags.push("<!-- Primary Meta Tags -->");
  metaTags.push(generateMetaTags("title", 3));
  metaTags.push(generateMetaTags("description", 0));
  metaTags.push("\n<!-- Open Graph / Facebook -->");
  metaTags.push(generateMetaTags("type", 1));
  metaTags.push(generateMetaTags("url", 1));
  metaTags.push(generateMetaTags("title", 1));
  metaTags.push(generateMetaTags("description", 1));
  metaTags.push(generateMetaTags("image", 1));
  metaTags.push("\n<!-- Twitter -->");
  metaTags.push(generateMetaTags("card", 2));
  metaTags.push(generateMetaTags("url", 2));
  metaTags.push(generateMetaTags("title", 2));
  metaTags.push(generateMetaTags("description", 2));
  metaTags.push(generateMetaTags("image", 2));
  metaTags.push("\n<!-- Optional Meta Tags -->");
  metaTags.push(generateMetaTags("keywords", 0));
  metaTags.push(generateMetaTags("robots", 0));
  metaTags.push(generateMetaTags("content-type", 0));
  metaTags.push(generateMetaTags("viewport", 0));
  metaTags.push(generateMetaTags("author", 0));
  metaTags.push(generateMetaTags("language", 0));
  metaTags.push(generateMetaTags("revisit-after", 0));
  metaTags.push(generateMetaTags("refresh", 0));
  metaTags.push(
    "\n<!-- Meta Tags Generated with https://ali5723.github.io/metaGenerator/ -->"
  );

  result = metaTags.filter((tag) => tag !== null).join("\n");

  document.getElementById("result").innerHTML = result;
}
