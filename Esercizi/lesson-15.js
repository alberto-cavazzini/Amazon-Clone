 import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 
//import isWeekend from './lesson-15F';

console.log(dayjs());

//15A:
const today = dayjs();
// const date = today.add(5, 'days');
// date.format('MMMM, D');
// console.log(date.format('MMMM, D'));

//15B:
const dateMonth = today.add(1, 'month');
dateMonth.format('MMMM, D');

console.log(dateMonth.format('MMMM, D'));

//15C:
const monthBefore = today.subtract(1, 'month');
monthBefore.format('MMMM, D');

console.log(monthBefore.format('MMMM, D'));

//15D:
console.log(today.format('dddd'));

//15E:
//let date = dayjs().add(5, 'days');
//console.log(isWeekend(date));
