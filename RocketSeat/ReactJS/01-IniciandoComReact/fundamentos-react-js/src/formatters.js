import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const formatDateTime = (date) => {
  const formattedDate = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  return formattedDate;
};

export const formatRelativeDateTime = (date) => {
  const formattedRelativeDate = formatDistanceToNow(date, {
    locale: ptBR,
    addSufix: true,
  });

  return formattedRelativeDate;
};
