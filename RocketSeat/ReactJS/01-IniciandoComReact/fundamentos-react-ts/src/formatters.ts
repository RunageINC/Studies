import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const formatDateTime = (date: Date) => {
  const formattedDate = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  return formattedDate;
};

export const formatRelativeDateTime = (date: Date) => {
  const formattedRelativeDate = formatDistanceToNow(date, {
    locale: ptBR,
    addSufix: true,
  });

  return formattedRelativeDate;
};
