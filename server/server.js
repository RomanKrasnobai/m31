const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let artists = [
    {
        id: 1,
        name: 'Metallica',
    },
    {
        id: 2,
        name: 'Iron maiden',
    },
    {
        id: 3,
        name: 'Led Zepellin',
    },
];

app.get('/', function (req, res) {
    res.send('Hello Api!');
});

app.get('/artists', function (req, res) {
    res.send(artists);
});

app.get('/artists/:id', function (req, res) {
    console.log(req.params);
    let artist = artists.find(artist => {
        return artist.id === Number(req.params.id);
    });
    res.send(artist);
});

app.post('/artists', function (req, res) {
    let artist = {
        id: Date.now(),
        name: req.body.name,
    };
    artists.push(artist);
    res.send(artist);
});

app.put('/artists/:id', function (req, res) {
    let artist = artists.find(artist => {
        return artist.id === Number(req.params.id);
    });
    artist.name = req.body.name;
    res.sendStatus(200);
})

app.delete('/artists/:id', function (req, res) {
    artists = artists.filter(artist => {
        return artist.id !== Number(req.params.id);
    });
    res.sendStatus(200);
})

app.listen(3012, function() {
    console.log('Port 3012 with Api started');
});