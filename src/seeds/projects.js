import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    name: 'Stronghold',
    description: 'Other superficial bite of breast, left breast',
    startDate: '1-4-2022',
    endDate: '9-12-2022',
    clientName: 'Schumm LLC',
    employees: [
      {
        employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
        role: 'DEV',
        rate: '150',
      },
      {
        employee: mongoose.Types.ObjectId('6352dbec0259a3a36db761d3'),
        role: 'QA',
        rate: '250',
      },
    ],
  },
  {
    _id: mongoose.Types.ObjectId('635342acfc13ae517a00001f'),
    name: 'Andalax',
    description: 'Unspecified open wound, unspecified ankle, initial encounter',
    startDate: '1-27-2022',
    endDate: '8-11-2022',
    clientName: 'Hane LLC',
    employees: [
      {
        employee: mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
        role: 'DEV',
        rate: '100',
      },
      {
        employee: mongoose.Types.ObjectId('6352dafc15b1b196950a8583'),
        role: 'TL',
        rate: '300',
      },
      {
        employee: mongoose.Types.ObjectId('6352daf6f8285eeb69b2fabe'),
        role: 'QA',
        rate: '145',
      },
    ],
  },
  {
    _id: mongoose.Types.ObjectId('635342acfc13ae517a000020'),
    name: 'Regrant',
    description: 'Nursemaid elbow',
    startDate: '1-30-2022',
    endDate: '7-22-2022',
    clientName: 'Mraz, Fritsch and Schumm',
    employees: [
      {
        employee: mongoose.Types.ObjectId('6352dbec0259a3a36db761d3'),
        role: 'QA',
        rate: '200',
      },
      {
        employee: mongoose.Types.ObjectId('6352daf6f8285eeb69b2fabe'),
        role: 'PM',
        rate: '350',
      },
    ],
  },
];
