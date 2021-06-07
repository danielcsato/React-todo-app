export const sampleTodos = [
  {
    id: '1',
    title: 'Sample todo 1',
    isDone: false,
    createTime: '2021',
    subTasks: [
      {
        id: '3',
        title: 'Sample subtodo 1',
        isDone: false,
        createTime: '2021',
        parentId: '1',
      },
      {
        id: '4',
        title: 'Sample subtodo 2',
        isDone: true,
        createTime: '2021',
        parentId: '1',
      },
    ],
  },
  {
    id: '2',
    title: 'Sample todo 2',
    isDone: false,
    createTime: '2021',
    subTasks: [
      {
        id: '5',
        title: 'Sample subtodo 3',
        isDone: true,
        createTime: '2021',
        parentId: '2',
      },
    ],
  },
];
