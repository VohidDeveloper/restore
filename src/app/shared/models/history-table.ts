export interface HistoryResponse {
  current_page: number;
  total: number;
  data: HistoryTable[];
  last_page: number;
}

export interface HistoryTable {
  payment: string;
  coins: string;
  plan: string;
  date: string;
}
