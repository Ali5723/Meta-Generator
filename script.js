function printFormData(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  let meta = [
    '<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>',
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>',
  ];

  for (const [name, value] of formData.entries()) {
    if (value != 0) {
      if (name == "revisit-after") {
        meta.push(`<meta name="${name}" content="${value} days"></meta>`);
      } else {
        meta.push(`<meta name="${name}" content="${value}"></meta>`);
      }
    }
  }

  document.getElementById("result").innerHTML = meta.join("\n");
}
