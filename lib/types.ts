export type Id = string | number;

export type Column = {
  id: number;
  title: string;
  userId: string;
  createdAt?: Date;
  tasks?: Task[];
};

export type Task = {
  id: number;
  content: string;
  userId: string;
  createdAt?: Date;
  kanbanColumnId: number;
};
