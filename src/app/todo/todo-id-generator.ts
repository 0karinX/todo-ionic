import moment from 'moment';

export const generateId = () => moment().valueOf().toString();
