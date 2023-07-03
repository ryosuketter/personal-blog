import { format, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'

interface ConvertDateProps {
  date: string
  className?: string
}

export const ConvertDate = ({ date, className = '' }: ConvertDateProps) => {
  return <time className={className}>{format(parseISO(date), 'yyyy/MM/dd', { locale: ja })}</time>
}
