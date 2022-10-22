import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6352e89b4760bc22934f3507'),
    description: 'Any string that describe how boring it is create mock ups...',
    date: '3-28-2022',
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a71000020'),
    employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
    project: mongoose.Types.ObjectId('635342acfc13ae517a000020'),
    hours: '999',
  },
  {
    _id: mongoose.Types.ObjectId('6352eb462bacec0e04ed2036'),
    description: 'potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem',
    date: '11-18-2022',
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001f'),
    employee: mongoose.Types.ObjectId('6352daf6f8285eeb69b2fabe'),
    project: mongoose.Types.ObjectId('635342acfc13ae517a00001f'),
    hours: '2',
  },
  {
    _id: mongoose.Types.ObjectId('6352f1d2c02b5c9fa29871d2'),
    description: 'A suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur.',
    date: '9-21-2021',
    task: mongoose.Types.ObjectId('63534ef4fc13ae1a7100001e'),
    employee: mongoose.Types.ObjectId('6352dafc15b1b196950a8583'),
    project: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    hours: '4',
  },
];
