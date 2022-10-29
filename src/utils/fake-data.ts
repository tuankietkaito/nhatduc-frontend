import { Gender } from './constants';
import { ICustomer, IProduct, IBill, IExamination } from './types';

function createProduct(
  _id: string,
  name: string,
  code: string,
  unit: string,
  price: number
): IProduct {
  return { _id, name, code, unit, price };
}

function createCustomer(
  _id: string,
  name: string,
  gender: Gender,
  phone: string,
  address: string,
  birthday: Date,
  totalSpend: number | null = null
) {
  return { _id, name, gender, phone, address, birthday, totalSpend } as ICustomer;
}

function createExamination(_id: string) {
  return {
    _id,
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    doctor: 'Ninh Văn Tài',
    eyes: {
      sphere: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      cylinder: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      axis: { left: Math.floor(Math.random() * 10) + 1, right: Math.floor(Math.random() * 10) + 1 },
      visualAcuityGlasses: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      visualAcuity: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      pupillaryDistance: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      addition: Math.floor(Math.random() * 20)
    },
    glasses: {
      sphere: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      cylinder: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      axis: { left: Math.floor(Math.random() * 10) + 1, right: Math.floor(Math.random() * 10) + 1 },
      visualAcuityGlasses: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      visualAcuity: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      pupillaryDistance: {
        left: Math.floor(Math.random() * 10) + 1,
        right: Math.floor(Math.random() * 10) + 1
      },
      addition: Math.floor(Math.random() * 20),
      otherProperties: [
        { key: 'Chỉ số A', value: Math.floor(Math.random() * 10) + 1 },
        { key: 'Chỉ số B', value: Math.floor(Math.random() * 10) + 1 }
      ]
    },
    fee: Math.floor(Math.random() * 150000) + 100000,
    createdAt: new Date()
  } as IExamination;
}

const defaultCustomers = [
  createCustomer(
    'awhjvdqurwk',
    'Mai Huỳnh Tuấn Kiệt',
    Gender.MALE,
    '0924888474',
    '48/19 Khu phố 1, P.Thống Nhất, Tp.Biên Hoà, Đồng Nai',
    new Date('2000-01-03T00:00:00'),
    29000000
  ),
  createCustomer(
    'sfhjvbieh',
    'Phạm Thiên Ngọc',
    Gender.FEMALE,
    '0388807247',
    'Thuận Hoà, Tp.Biên Hoà, Đồng Nai',
    new Date('2000-03-31T00:00:00')
  ),
  createCustomer(
    'shjdfvbukhjwer',
    'Mai Huỳnh Phương Trâm',
    Gender.FEMALE,
    '0999111222',
    '09 KP3, P.Tam Hoà, Tp.Biên Hoà, Đồng Nai',
    new Date('2005-06-27T00:00:00')
  ),
  createCustomer(
    'hjefvbhwejk',
    'Trần Quốc Bảo',
    Gender.MALE,
    '0987654321',
    '51/2 Âu Cơ, P.14, Quận 11, TpHCM',
    new Date('2000-03-15T00:00:00')
  ),
  createCustomer(
    'hfasviyvfds',
    'Mai Hắc Quân',
    Gender.MALE,
    '0908824922',
    '48/19 Khu phố 1, P.Thống Nhất, Tp.Biên Hoà, Đồng Nai',
    new Date('1974-04-24T00:00:00')
  ),
  createCustomer(
    '92785gbih4t',
    'Huỳnh Minh Nhất Chi Mai',
    Gender.FEMALE,
    '0918915122',
    '48/19 Khu phố 1, P.Thống Nhất, Tp.Biên Hoà, Đồng Nai',
    new Date('1972-08-23T00:00:00')
  ),
  createCustomer(
    '5972vbihefb8',
    'Khánh Huyền',
    Gender.FEMALE,
    '0999111222',
    '43/4 Thành Thái, P.14, Q.10, TpHCM',
    new Date('2005-06-27T00:00:00')
  ),
  createCustomer(
    '8c2sefgt8795',
    'John Cena',
    Gender.MALE,
    '0987654321',
    'Quận 11, TpHCM',
    new Date('1980-12-31T00:00:00')
  )
];

const defaultProducts = [
  createProduct('havb234tuy', 'Mắt kính A', 'ABC', 'chiếc', 850000),
  createProduct('svdfsdfg25', 'Gọng kính tròn', 'DEF', 'chiếc', 1250000),
  createProduct('havwefvbuy', 'Gọng kính mỏng', 'GHI', 'chiếc', 380000),
  createProduct('hav4nyhbuy', 'Kính áp tròng', 'JKL', 'chiếc', 750000),
  createProduct('hav31c4buy', 'Kính 1', 'MNO', 'chiếc', 980000),
  createProduct('h421davbuy', 'Kính 2', 'PQR', 'chiếc', 1110000),
  createProduct('havc34tbuy', 'Gọng Beta', 'STU', 'chiếc', 230000),
  createProduct('hav523tbuy', 'Gọng Delta', 'VWX', 'chiếc', 1300000),
  createProduct('havvwefbuy', 'Mắt kính X', 'YNZ', 'chiếc', 850000),
  createProduct('havcwqermy', 'Mắt kính KIZ', 'HVJ', 'chiếc', 890000),
  createProduct('havb5243uy', 'Smart Glasses', 'DVJ', 'chiếc', 650000),
  createProduct('hav1vs33uy', 'Kính ABCDEF', 'OKN', 'chiếc', 1150000),
  createProduct('hav3buy2rv', 'Gọng thuỷ tinh', 'UHM', 'chiếc', 850000)
];

const defaultBills: IBill[] = [
  {
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    products: [
      { product: { name: 'Mắt kính A', code: 'ABC', unit: 'chiếc', price: 850000 }, quantity: 1 },
      {
        product: { name: 'Gọng kính tròn', code: 'DEF', unit: 'chiếc', price: 1250000 },
        quantity: 1
      }
    ],
    total: 2100000,
    createdAt: new Date()
  },
  {
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    products: [
      {
        product: { name: 'Kính 1', code: 'MNO', unit: 'chiếc', price: 1000000 },
        quantity: 2
      },
      { product: { name: 'Gọng Beta', code: 'STU', unit: 'chiếc', price: 230000 }, quantity: 1 },
      { product: { name: 'Smart Glasses', code: 'DVJ', unit: 'chiếc', price: 650000 }, quantity: 1 }
    ],
    total: 3550000,
    createdAt: new Date('2021-12-22T00:00:00')
  },
  {
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    products: [
      { product: { name: 'Mắt kính A', code: 'ABC', unit: 'chiếc', price: 850000 }, quantity: 1 },
      {
        product: { name: 'Gọng kính tròn', code: 'DEF', unit: 'chiếc', price: 1250000 },
        quantity: 1
      }
    ],
    discount: 0.03,
    total: 2037000,
    createdAt: new Date('2022-03-02T00:00:00')
  },
  {
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    products: [
      {
        product: { name: 'Kính 1', code: 'MNO', unit: 'chiếc', price: 1000000 },
        quantity: 2
      },
      { product: { name: 'Gọng Beta', code: 'STU', unit: 'chiếc', price: 230000 }, quantity: 1 },
      { product: { name: 'Smart Glasses', code: 'DVJ', unit: 'chiếc', price: 650000 }, quantity: 1 }
    ],
    total: 3550000,
    createdAt: new Date('2021-12-22T00:00:00')
  },
  {
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    products: [
      { product: { name: 'Mắt kính A', code: 'ABC', unit: 'chiếc', price: 850000 }, quantity: 1 },
      {
        product: { name: 'Gọng kính tròn', code: 'DEF', unit: 'chiếc', price: 1250000 },
        quantity: 1
      }
    ],
    total: 2100000,
    createdAt: new Date('2022-03-02T00:00:00')
  },
  {
    customer: defaultCustomers[Math.floor(Math.random() * 8)],
    products: [
      {
        product: { name: 'Kính 1', code: 'MNO', unit: 'chiếc', price: 1000000 },
        quantity: 2
      },
      { product: { name: 'Gọng Beta', code: 'STU', unit: 'chiếc', price: 230000 }, quantity: 1 },
      { product: { name: 'Smart Glasses', code: 'DVJ', unit: 'chiếc', price: 650000 }, quantity: 1 }
    ],
    total: 3550000,
    createdAt: new Date('2021-12-22T00:00:00')
  }
];

const defaultExams: IExamination[] = [
  createExamination('huav874v78'),
  createExamination('987145ghb8'),
  createExamination('2c7985vrfw'),
  createExamination('42cx8n9gh8'),
  createExamination('25vcg543cv'),
  createExamination('2v6cy26w6h'),
  createExamination('hvregv67f5'),
  createExamination('vb74jehe3s')
];

export const data = {
  products: defaultProducts,
  customers: defaultCustomers,
  bills: defaultBills,
  exams: defaultExams
};
