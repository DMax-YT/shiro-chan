const translate = (templatePath, locale = "ru-RU", data = {}) => {
  const localeTemplates = require(`../locales/${locale}.json`);
  let template;
  const keys = templatePath.split(".");
  for (const key of keys) {
    template = template?.[key] || localeTemplates[key];
  }

  if (Array.isArray(template)) {
    return template;
  }

  return template.replace(
    /{([\w\d_]*?)}/gm,
    (match, key) => data[key] || match
  );
};

module.exports = translate;
