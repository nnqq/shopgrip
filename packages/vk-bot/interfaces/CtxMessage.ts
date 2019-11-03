export interface CtxMessage {
  date: number;
  from_id: number;
  id: number;
  out: number;
  peer_id: number;
  text: string;
  conversation_message_id: number;
  fwd_messages: [];
  important: boolean;
  random_id: number;
  attachments?: [] | [
    {
      type: 'link';
      link: {
        url: string;
        title: string;
        caption: string;
        description: string;
        photo: {
          id: number;
          album_id: number;
          owner_id: number;
          sizes: Array<{
            type: string;
            url: string;
            width: number;
            height: number;
          }>;
          text: string;
          date: number;
        };
        is_favorite: boolean;
      };
    }
  ];
  is_hidden: boolean;
  type: string;
}
