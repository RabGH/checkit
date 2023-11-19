export type Id = string | number;

export type Column = {
  id: Id;
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
