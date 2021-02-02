const configure = require('enzyme').configure;
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

configure({ adapter: new EnzymeAdapter() });
