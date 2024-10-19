const fs = require('fs');
const path = require('path');

var express = require('express');
var router = express.Router();

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
      const label = parts[0].split(' ').slice(2).join(' ');

      nodes.push({ id: id, label: label, x: 100, y: 100 });
    }
  });

  res.send(nodes);
});

router.get('/api/data/links', (req, res) => {
  const pointsData = fs.readFileSync(path.join(__dirname, '../data/metro.txt'), 'utf-8');
  const lines = pointsData.split('\n');
  const links = [];

  lines.forEach(line => {
    if (line.startsWith('E')) {
      const parts = line.split(' ');
      const from = parts[1];
      const to = parts[2];
      const value = parts[3];

      links.push({ from: from, to: to, value: value });
    }
  });

  res.send(links);
});

router.get('/api/data/positions', (req, res) => {
  const pointsData = fs.readFileSync(path.join(__dirname, '../data/pospoints.txt'), 'utf-8');
  const lines = pointsData.split('\n');
  const links = [];

  lines.forEach(line => {
    if (line.startsWith('E')) {
      const parts = line.split(' ');
      const from = parts[1];
      const to = parts[2];
      const time = parts[3];

      links.push({ from: from, to: to, time: time });
    }
  });

  res.send(links);
});

module.exports = router;
