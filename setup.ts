jest.setTimeout(1000 * 30);
process.env.NODE_ENV = 'test';
process.env.MAX_DATABASE_CONNECTIONS = '10';
process.env.MIN_DATABASE_CONNECTIONS = '2';
jest.retryTimes(3);

jest.mock('source-map-support');
