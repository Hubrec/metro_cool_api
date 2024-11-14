const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();

const metroLineColors = {
  "1": "#FFC000",
  "2": "#016AB8",
  "3": "#9C9038",
  "3bis": "#62C1CF",
  "4": "#B8459B",
  "5": "#F5863C",
  "6": "#65B986",
  "7": "#F495AD",
  "7bis": "#63B885",
  "8": "#B99DCB",
  "9": "#B2BA27",
  "10": "#D09E21",
  "11": "#90683E",
  "12": "#018853",
  "13": "#60BFCE",
  "14": "#5D208D",
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/data/stations', (req, res) => {
  const pointsData = fs.readFileSync(path.join(__dirname, '../data/metro.txt'), 'utf-8');
  const lines = pointsData.split('\n');
  const nodes = [];

  lines.forEach(line => {
    if (line.startsWith('V')) {
      const parts = line.split(';');
      const id = +parts[0].split(' ')[1];
      const label = parts[0].split(' ').slice(2).join(' ').trim();
      const lineNbr = parts[1].split(' ')[0];

      nodes.push({ id: id, label: label, name: label, color: metroLineColors[lineNbr], x: 0, y: 0, positioned: false, shouldBeLabeled: true });
    }
  });

  const posPointsData = fs.readFileSync(path.join(__dirname, '../data/pospoints.txt'), 'utf-8');
  const posLines = posPointsData.split('\n');

  posLines.forEach(line => {
    const parts = line.split(';');
    const x = +parts[0];
    const y = +parts[1];
    const label = parts[2].replace(/@/g, ' ').trim();

    const node = nodes.find(n => n.label === label && !n.positioned);
    if (node) {
      Object.assign(node, { x, y, positioned: true });
    }
  });

  const nameList= [];
  nodes.forEach(node => {
    if (nameList.includes(node.label)) {
      Object.assign(node, { shouldBeLabeled: false, label: ""});
    } else {
      nameList.push(node.label);
    }
  })

  res.send(nodes);
});

router.get('/api/data/links', (req, res) => {
  const pointsData = fs.readFileSync(path.join(__dirname, '../data/metro.txt'), 'utf-8');
  const lines = pointsData.split('\n');
  const links = [];

  lines.forEach(line => {
    if (line.startsWith('E')) {
      const parts = line.split(' ');
      const from = +parts[1];
      const to = +parts[2];
      const value = +parts[3];

      links.push({ from: from, to: to, time: value });
    }
  });

  res.send(links);
});

module.exports = router;
