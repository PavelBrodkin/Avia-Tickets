import {format} from "date-fns"; 

/**
 * 
 * @param {string} str - дата в виде строки
 * @param {string} type - шаблон форматирования (yyyy.mm.dd)
 * @returns 
 */

export default function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
} 