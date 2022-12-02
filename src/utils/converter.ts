/* Convert Date as format dd.MM.yyyy */
export const convertDate = (dateString: any, withTime: boolean = false) => {
  const date = new Date(dateString);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  let time = '';
  if (withTime) {
    const hh = date.getHours();
    const mm = date.getMinutes();
    time = `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}`;
  }

  const res = [day, month, year].join('.');
  return withTime ? time + ' - ' + res : res;
};

/* Convert Phone String as 09xx xxx xxx or 03xxx xxx xxx */
export const convertPhoneNumber = (phone: string) => {
  if (phone.length !== 10 && phone.length !== 11) return phone;
  if (phone.length === 10)
    return [phone.substring(0, 4), phone.substring(4, 7), phone.substring(7)].join(' ');
  else return [phone.substring(0, 5), phone.substring(5, 8), phone.substring(8)].join(' ');
};

/* Remove Vietnamese accents */
export const removeAccents = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

/* Format number with comma( 10000 -> 10,000 đ) */
export const convertNumberToCurrencyString = (x: number) => {
  if (!x) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/* Check promotion from totalSpend */
export const checkPromotion = (totalSpend: number) => {
  if (totalSpend >= 100000000) return 0.1;
  if (totalSpend >= 50000000) return 0.05;
  if (totalSpend >= 20000000) return 0.03;
  return 0;
};
