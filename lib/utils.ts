import { clsx, type ClassValue } from "clsx"
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, format } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | undefined): string => {
  if (!date) return 'Date not available'; 
  return `${format(date, 'dd MMM yyyy')}`; 
};

export const truncateText = (text: string, maxLength: number = 30) => {
  const minDisplayLength = 20;

  if (text.length <= maxLength) {
    return text;
  }

  const truncationLength = Math.max(minDisplayLength, maxLength);
  return text.slice(0, truncationLength) + '...';
};


export const formatShortDuration = (date: string | Date) => {
  const now = new Date();
  const messageDate = new Date(date);

  const minutesDifference = differenceInMinutes(now, messageDate);
  const hoursDifference = differenceInHours(now, messageDate);
  const daysDifference = differenceInDays(now, messageDate);
  const monthsDifference = differenceInMonths(now, messageDate);

  if (minutesDifference < 1) {
    return 'now';
  } else if (minutesDifference < 60) {
    return `${minutesDifference}m ago`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}h ago`;
  } else if (daysDifference < 30) {
    return `${daysDifference}d ago`;
  } else {
    return `${monthsDifference}mo ago`;
  }
};