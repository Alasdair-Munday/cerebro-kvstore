const { search } = require('cerebro-tools');
const fs = require('fs');
const os = require('os');
const Preview = require('./preview.jsx');
const home = os.homedir();

var entries;
fs.readFile(`${home}/entries.json`, (readErr, data) => {
  entries = JSON.parse(data) || {};
  if (readErr) {
    saveFile(entries);
  }
});

const saveFile = (json) => () => {
  fs.writeFile(`${home}/entries.json`, JSON.stringify(json), (writeErr) => {
    if(writeErr) throw writeErr;
  })
}

const plugin = ({ term, display, update }) => {
  const change = (entries, key) => (value) => {
    entries[key] = value;
    display(createEntry(key, entries));
  }

  const createEntry = (key, entries) => {
    return {
      id: key,
      title: key,
      clipboard: entries[key] || '',
      getPreview: () => <Preview key={key}
                                 value={entries[key] || ''}
                                 change={change(entries, key)}
                                 save={saveFile(entries)}
                                 remove={() => delete entries[key]}/>
    }
  }

  const match = term.match(/^kv\s(.+)$/);
  if (match) {
    const searchedTerm = match[1];
    const results = search(Object.keys(entries), searchedTerm).map((key) => {
      return createEntry(key, entries);
    });

    if(!entries[searchedTerm]){
      results.unshift(createEntry(searchedTerm, entries))
    }

    display(results);
  }
}

module.exports = {
  fn: plugin,
  keyword: 'kv'
}
