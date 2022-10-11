export interface Message {
  id: number;
  message_header_id: number;
  is_from_sender: number;
  received: number;
  message: string;
  created_at: string;
  updated_at: string;
}
