export interface UserListVo {
  status: 'error' | 'loading' | 'success';
  items?: { id: string; username: string; role: string; }[];
}
