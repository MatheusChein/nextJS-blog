import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);

  const formattedDate = format(date, `dd MMM yyyy`, {
    locale: ptBR,
  });

  return formattedDate;
}
