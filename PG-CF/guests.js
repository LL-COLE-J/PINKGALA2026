const lines = raw.split("\n").map(l => l.trim()).filter(l => l);

const rows = [];

for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split("\t");

  const table = parts[0];
  const first = parts[1];
  const last = parts[2];

  if (!first && !last) continue;

  const name = (first + " " + last).trim();
  if (!name) continue;

  rows.push({ table, name });
}

// map tables → numbers
const tableMap = {};
let t = 1;

rows.forEach(r => {
  if (!tableMap[r.table]) {
    tableMap[r.table] = String(t++);
  }
});

// build guests
const guests = rows.map((r, i) => ({
  id: String(i + 1),
  name: r.name,
  bidder: String(101 + i),
  table: tableMap[r.table]
}));

const output = `const GUESTS = ${JSON.stringify(guests, null, 2)};`;

copy(output);
