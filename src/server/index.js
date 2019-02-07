const express = require('express');

const app = express();
process.env.LEAGUE_API_KEY = 'RGAPI-33195678-8070-440a-8cbd-14c72e9b2a0e';

const LeagueJS = require('leaguejs');
const leagueJs = new LeagueJS(process.env.LEAGUE_API_KEY, {
  useV4: true
});

app.use(require('body-parser').json());

app.use(express.static('dist'));

app.get('/api/', (req, res) => res.send('HELLO'));
app.post('/api/search-summoner', (req, res) => {
  const { name, region } = req.body;

  leagueJs.Summoner
    .gettingByName(name, region)
    .then((account) => {
      leagueJs.Match
        .gettingListByAccount(account.accountId, region, {
          endIndex: 5,
        })
        .then((matchData) => {
          res.send(matchData);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send('error');
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
