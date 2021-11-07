import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface FormateDateResponse {
  formattedDate: string;
  formattedHour: string;
}

export function formatDate(dateString: string): FormateDateResponse {
  const date = parseISO(dateString);

  const formattedDate = format(date, `dd MMM yyyy`, {
    locale: ptBR,
  });

  const formattedHour = format(date, 'H:m:s', {
    locale: ptBR,
  });

  return {
    formattedDate,
    formattedHour,
  };
}
