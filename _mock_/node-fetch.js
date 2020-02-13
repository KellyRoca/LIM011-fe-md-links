const fetchMock = require('fetch-mock');

const myMock = fetchMock.sandbox().mock('/home', 200);
