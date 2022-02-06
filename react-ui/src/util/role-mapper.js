const admin = 'ADMIN';
const linearAndProjectManager = 'LM_PM';
const linearManager = 'LINEAR_MANAGER';
const projectManager = 'PROJECT_MANAGER';
const worker = 'WORKER';

export const isAdmin = (role) => role === admin;

export const isManager = (role) =>
    role === linearManager || role === projectManager || role === linearAndProjectManager;

export const isWorker = (role) => role === worker;