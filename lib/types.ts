export type Id = string | number;

export type Column = {
  id: number;
  title: string;
  userId: Id;
  createdAt?: Date;
  tasks?: Task[];
};

export type Task = {
  id: Id;
  content: string;
  userId: Id;
  createdAt?: Date;
  kanbanColumnId: Id;
};
